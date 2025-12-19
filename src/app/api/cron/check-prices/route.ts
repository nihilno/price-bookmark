import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, user_id, url, current_price, currency, name, image_url");

    if (productsError) {
      throw productsError;
    }

    for (const product of products) {
      try {
        const productData = await scrapeProduct(product.url);

        if (!productData || !productData.currentPrice) {
          continue;
        }

        const newPrice = productData.currentPrice;
        const oldPrice = product.current_price as number;

        const { error: updateError } = await supabase
          .from("products")
          .update({
            current_price: newPrice,
            currency: productData.currencyCode || product.currency,
            name: productData.productName || product.name,
            image_url: productData.productImageUrl || product.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id);
        if (updateError) {
          console.error("Error updating product:", product.id, updateError);
          continue;
        }

        if (oldPrice !== newPrice) {
          const { error: historyError } = await supabase
            .from("price_history")
            .insert({
              product_id: product.id,
              price: newPrice,
              currency: productData.currencyCode || product.currency,
              // add checked_at timestamp?
            });

          if (newPrice < oldPrice) {
            // send notification
            const data = await supabase.auth.admin.getUserById(product.user_id);
            const user = data.data.user;

            if (user && user.email) {
              //send actual email
            }
          }

          if (historyError) {
            console.error(
              "Error inserting price history for product:",
              product.id,
              historyError,
            );
          }
        }
      } catch (error) {
        console.error("Error processing product:", product.id, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Price check completed.",
    });
  } catch (error) {
    console.error("Error in price check cron job:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
