"use client";

import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { cn, formatDate, normalizeUrl } from "@/lib/utils";
import {
  ChevronLeft,
  Loader2Icon,
  Radar,
  Tag,
  TrendingDown,
  TrendingUp,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ChartLineDots } from "./chart";

function Product(props: ProductProps) {
  const { product, priceHistory } = props;
  const { name, current_price, currency, url, image_url, id } = product;
  const { isDeleting, handleDelete } = useDeleteProduct();
  const [isConfirming, setIsConfirming] = useState(false);
  const { replace } = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function onDelete(id: string) {
    if (!isConfirming) {
      setIsConfirming(true);
      timeoutRef.current = setTimeout(() => {
        setIsConfirming(false);
      }, 3000);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      await handleDelete(id);
      setIsConfirming(false);
      replace("/watchlist");
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-12 px-4 text-sm">
      <article className="flex h-full flex-col items-center">
        <h1 className="mb-12 line-clamp-3 text-xl font-semibold lg:text-2xl">
          {name}
        </h1>
        {image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image_url}
            alt={name.slice(0, 10)}
            className="h-32 w-32 overflow-hidden rounded-sm bg-white object-cover object-top"
            loading="lazy"
            decoding="async"
            width={128}
            height={128}
          />
        )}
        <div className="mt-6 mb-12 flex flex-col items-center gap-2 text-2xl font-bold">
          <div className="flex items-center gap-2">
            <span>
              {priceHistory.success && priceHistory.history.length > 0
                ? priceHistory.history[priceHistory.history.length - 1].price
                : current_price}
            </span>
            <span>{currency}</span>
            {priceHistory.success &&
              priceHistory.history.length > 0 &&
              (priceHistory.history[priceHistory.history.length - 1].price <
              current_price ? (
                <TrendingDown className="size-7 animate-pulse text-green-500" />
              ) : priceHistory.history[priceHistory.history.length - 1].price >
                current_price ? (
                <TrendingUp className="size-7 animate-pulse text-red-500" />
              ) : null)}{" "}
          </div>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Link href="/watchlist">
              <Button
                size="sm"
                className="h-10 min-w-50! rounded-sm text-base"
                variant="outline"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2Icon className="size-5 shrink-0 animate-spin" />
                ) : (
                  <div className="flex items-center gap-4">
                    <ChevronLeft className="size-5" />
                    <span>Go Back</span>
                  </div>
                )}
              </Button>
            </Link>
            <a href={normalizeUrl(url)} target="_blank">
              <Button
                size="sm"
                className="h-10 min-w-50! rounded-sm text-base"
                variant="outline"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2Icon className="size-5 shrink-0 animate-spin" />
                ) : (
                  <div className="flex items-center gap-4">
                    <Tag className="size-5" />
                    <span>View Product</span>
                  </div>
                )}
              </Button>
            </a>
            <Button
              size="sm"
              className={cn(
                "border-destructive/25! bg-destructive/10! hover:border-destructive/20! hover:bg-destructive/15! h-10 min-w-50! rounded-sm text-base",
                isConfirming &&
                  "border-destructive/60! bg-destructive/30! hover:border-destructive/60! hover:bg-destructive/30!",
              )}
              variant="outline"
              disabled={isDeleting}
              onClick={() => onDelete(id)}
            >
              {isDeleting ? (
                <Loader2Icon className="size-5 shrink-0 animate-spin" />
              ) : (
                <div className="flex items-center gap-4">
                  <XIcon className="size-5" />
                  {isConfirming ? (
                    <span>Are you sure?</span>
                  ) : (
                    <span>Delete Product</span>
                  )}
                </div>
              )}
            </Button>
          </div>
        </div>
      </article>

      <div className="w-full max-w-3xl space-y-8 text-center">
        {!priceHistory.success ? (
          <p className="text-muted-foreground text-sm">{priceHistory.error} </p>
        ) : (
          <div className="rounded-md">
            <div className="relative mb-8 flex w-full flex-col items-center gap-4 rounded-md border p-6 text-center backdrop-blur-3xl">
              <h3 className="text-lg font-semibold">
                The price is now under our watch
              </h3>
              <p className="-mt-1">We&apos;ll notify you if it changes.</p>
              <Radar className="text-primary size-10 animate-pulse" />
              <p className="opacity-70">
                Last sniff:{" "}
                <span>
                  {priceHistory.history.length > 0
                    ? formatDate(
                        priceHistory.history[priceHistory.history.length - 1]
                          .checked_at,
                      )
                    : "N/A"}
                </span>
              </p>
              <Image
                src="/stalker.webp"
                alt="Stalker"
                fill
                className="-z-10 overflow-hidden rounded-md object-cover opacity-50"
                quality={50}
              />
            </div>
            <ChartLineDots data={priceHistory.history} />
          </div>
        )}

        <small className="opacity-70">ID: {id}</small>
      </div>
    </div>
  );
}

export default Product;
