import { Button } from "@/components/ui/button";
import Products from "@/components/watchlist/products";
import { getSingleProduct } from "@/lib/actions/actions";
import { CARD_STYLE } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { AlertTriangle, ChevronLeft, Info } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Paw‑prints",
};

export default async function WatchlistItemPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = await searchParams;
  const data = await getSingleProduct(id);

  if (!data.success)
    return (
      <section
        className={cn(
          CARD_STYLE,
          "flex h-full flex-col items-center justify-center gap-4 text-center",
        )}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertTriangle className="text-destructive size-12 animate-pulse" />
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-muted-foreground">{data.error}</p>
          <Link href="/watchlist" className="mt-8">
            <Button
              size="sm"
              className="h-10 min-w-50! rounded-sm text-base"
              variant="outline"
            >
              <div className="flex items-center gap-4">
                <ChevronLeft className="size-5" />
                <span>Go Back</span>
              </div>
            </Button>
          </Link>
        </div>
      </section>
    );

  const product = data.product;

  return (
    <section className={cn(CARD_STYLE)}>
      {product ? (
        <Products product={product} />
      ) : (
        <div className="flex w-full flex-col items-center gap-4">
          <Info className="text-destructive size-12 animate-pulse" />
          <h1 className="text-2xl font-bold">No products yet</h1>
          <p className="text-muted-foreground">
            You shouldn&apos;t be there. <br /> First add some products.
          </p>
          <Link href="/">
            <Button variant="outline">Add first product</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
