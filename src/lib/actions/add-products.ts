"use server";

import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@/lib/supabase/server";

export async function addProduct(formData: FormData) {
  const rawUrl = formData.get("url" as string);

  if (!rawUrl || typeof rawUrl !== "string") {
    return { success: false, error: "URL is required." };
  }

  const url = rawUrl.trim();

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

    return {
      success: true,
      product,
      message: alreadyExists
        ? "Product succesfully updated with latest price."
        : "Product added to the watchlist successfully.",
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Unexpected error while adding product." };
  }
}
