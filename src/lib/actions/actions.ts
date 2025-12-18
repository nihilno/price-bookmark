import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

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
