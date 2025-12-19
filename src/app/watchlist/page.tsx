import MainForm from "@/components/main/main-form";
import { ItemsSkeleton } from "@/components/skeletons/skeletons";
import Items from "@/components/watchlist/items";
import { CARD_STYLE } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Your Scratching Post",
};

export default function WatchlistPage() {
  return (
    <section className={cn(CARD_STYLE)}>
      <MainForm />
      <Suspense fallback={<ItemsSkeleton />}>
        <Items />
      </Suspense>
    </section>
  );
}
