import { revalidatePath } from "next/cache";
import { scrapeProduct } from "./firecrawl";
import { createClient } from "./supabase/server";

export async function addProduct(formData: FormData) {
  const url = formData.get("url");

  if (!url || typeof url !== "string") {
    return { error: "URL is required." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return {
        success: false,
        error: "Please, sign in first.",
      };

    const scrapedProduct = await scrapeProduct(url);

    if (!scrapedProduct.productName || !scrapedProduct.currentPrice) {
      return {
        success: false,
        error: "We could not extract product information from this URL.",
      };
    }

    const productPrice = scrapedProduct.currentPrice;
    const currency = scrapedProduct.currencyCode || "USD";

    const { data: existingProduct } = await supabase
      .from("products")
      .select("id, current_price")
      .eq("user_id", user.id)
      .eq("url", url)
      .maybeSingle();

    const alreadyExists = !!existingProduct;

    const { data: product, error } = await supabase
      .from("products")
      .upsert(
        {
          user_id: user.id,
          url,
          name: scrapedProduct.productName,
          current_price: productPrice,
          currency,
          image_url: scrapedProduct.productImageUrl,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,url",
          ignoreDuplicates: false,
        },
      )
      .select()
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    const addToHistory =
      !alreadyExists || existingProduct.current_price !== productPrice;

    if (addToHistory) {
      await supabase.from("price_history").insert({
        product_id: product.id,
        price: productPrice,
        currency,
      });
    }

    revalidatePath("/");

    return {
      success: true,
      product,
      message: alreadyExists
        ? "Product succesfully updated with latest price."
        : "Product added successfully.",
    };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected error while adding product." };
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw new Error("Could not delete this product. Try again later.");
    }

    revalidatePath("/");
    return {
      success: true,
      message: "Product successfully deleted from watchlist.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "We could not delete this product right now. Try again later.",
    };
  }
}

export async function getProducts() {
  try {
    const supabase = await createClient();
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      throw new Error("Could not fetch your products. Try again later.");
    }

    return products || [];
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "We could not fetch your products right now. Try again later.",
    };
  }
}

export async function getPriceHistory(id: string) {
  try {
    const supabase = await createClient();
    const { data: history, error } = await supabase
      .from("price_history")
      .select("*")
      .eq("product_id", id)
      .order("checked_at", { ascending: true });

    if (error) {
      console.error(error);
      throw new Error("Could not fetch price history. Try again later.");
    }

    return history || [];
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "We could not fetch price history right now. Try again later.",
    };
  }
}
