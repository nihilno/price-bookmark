"use server";

import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  const rawUrl = formData.get("url");
  if (!rawUrl || typeof rawUrl !== "string") {
    return { success: false, error: "A product URL is required." };
  }

  const url = rawUrl.trim();

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "Please sign in to track your purchases.",
      };
    }

    const scrapedProduct = await scrapeProduct(url);

    if (!scrapedProduct.productName || !scrapedProduct.currentPrice) {
      return {
        success: false,
        error: "We could not extract product information from this link.",
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
        { onConflict: "user_id,url", ignoreDuplicates: false },
      )
      .select()
      .single();

    if (error) throw error;

    const addToHistory =
      !alreadyExists || existingProduct.current_price !== productPrice;

    if (addToHistory) {
      const { error: historyError } = await supabase
        .from("price_history")
        .insert({
          product_id: product.id,
          price: productPrice,
          currency,
        });

      if (historyError) {
        console.error("Failed to add price history:", historyError);
        return {
          success: false,
          error: "Could not update the product's history.",
        };
      }
    }

    revalidatePath("/watchlist");

    return {
      success: true,
      product,
      message: alreadyExists
        ? "Product updated with the latest price whiskers."
        : "Product added to your watchlist successfully.",
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Unexpected error while adding product." };
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "Please sign in to delete products.",
      };
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/watchlist");
    return {
      success: true,
      message: "Product successfully scratched off your watchlist.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "We could not delete this product right now. Try again later.",
    };
  }
}

export async function getProducts(): Promise<GetProductsResult> {
  try {
    const supabase = await createClient();
    const { data: products, error } = await supabase
      .from("products")
      .select("name, id, current_price, currency, url, image_url")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { success: true, products };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "We could not fetch your catalog right now.",
    };
  }
}

export async function getPriceHistory(
  id: string,
): Promise<GetPriceHistoryResult> {
  try {
    const supabase = await createClient();
    const { data: history, error } = await supabase
      .from("price_history")
      .select("*")
      .eq("product_id", id)
      .order("checked_at", { ascending: true });

    if (error) throw error;

    return { success: true, history };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "We could not fetch this product's history right now.",
    };
  }
}

export async function getSingleProduct(
  id: string,
): Promise<GetSingleProductResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "Please sign in to view product details.",
      };
    }

    const { data: product, error } = await supabase
      .from("products")
      .select(
        "created_at, currency, image_url, name, current_price, url, updated_at, id",
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error)
      return {
        success: false,
        error: "We could not find this product.",
      };

    return { success: true, product };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "We could not fetch the product details right now.",
    };
  }
}
