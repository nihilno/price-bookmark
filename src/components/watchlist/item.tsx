"use client";

import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { cn, slugify } from "@/lib/utils";
import { Info, Loader2Icon, Radar, Tag, XIcon } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

function Item({ product }: { product: Product }) {
  const { name, current_price, currency, url, image_url, id } = product;
  const { isDeleting, handleDelete } = useDeleteProduct();
  const isMobile = useMediaQuery({ maxWidth: 375 });

  return (
    <article className="group hover:bg-background hover:border-muted-foreground/30 grid grid-cols-1 gap-y-3 border p-2 text-sm backdrop-blur-3xl transition-all duration-300 ease-in-out sm:grid-cols-4 md:px-4 md:text-base">
      <div className="flex items-center gap-4 sm:col-span-3">
        <h3 className="line-clamp-1 text-left lg:text-xl">{name}</h3>
        <div className="ml-auto flex shrink-0 items-center gap-1 font-bold lg:text-xl">
          <h4 className="first-letter:capitalize">{current_price}</h4>
          <h4 className="uppercase">{currency}</h4>
          <Radar className="text-primary ml-4 size-4.5 animate-pulse lg:size-6" />
        </div>
      </div>
      <div className="col-1 flex h-fit w-fit items-center gap-2">
        <Link href={`/watchlist/${slugify(name)}?id=${id}`}>
          <Button
            size="sm"
            className="rounded-sm text-xs md:text-base!"
            variant="outline"
            disabled={isDeleting}
          >
            <Info className="size-3 shrink-0 lg:size-4" />
            <span className={cn(isMobile ? "hidden" : "block")}>More</span>
          </Button>
        </Link>
        <a href={url} target="_blank">
          <Button
            size="sm"
            className="rounded-sm text-xs md:text-base!"
            variant="outline"
            disabled={isDeleting}
          >
            <Tag className="size-3 shrink-0 lg:size-4" />
            <span className={cn(isMobile ? "hidden" : "block")}>
              View Product
            </span>
          </Button>
        </a>
        <Button
          size="sm"
          className="border-destructive/50! bg-destructive/20! hover:border-destructive/60! hover:bg-destructive/30! rounded-sm text-xs md:text-base!"
          variant="outline"
          disabled={isDeleting}
          onClick={() => handleDelete(id)}
        >
          {isDeleting ? (
            <Loader2Icon className="size-3 shrink-0 animate-spin lg:size-4" />
          ) : (
            <XIcon className="size-3 shrink-0 lg:size-4" />
          )}
        </Button>
      </div>

      {image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image_url}
          alt={name.slice(0, 10)}
          className="absolute top-2 right-2 col-start-4 hidden h-16 w-16 justify-self-end overflow-hidden rounded-sm bg-white object-cover object-top sm:block md:right-4"
          loading="lazy"
          decoding="async"
          width={64}
          height={64}
        />
      ) : (
        <div className="absolute top-2 col-start-4 hidden size-16 justify-self-end border backdrop-blur-3xl sm:block md:right-4" />
      )}
    </article>
  );
}

export default Item;
