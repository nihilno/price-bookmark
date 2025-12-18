import { CARD_STYLE } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watchlist",
};

export default function WatchlistPage() {
  return <section className={cn(CARD_STYLE)}>Page</section>;
}
