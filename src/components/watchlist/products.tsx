"use client";

import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { ChevronLeft, Loader2Icon, Radar, Tag, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function Products({ product }: { product: Product }) {
  const { name, current_price, currency, url, image_url, id } = product;
  const { isDeleting, handleDelete } = useDeleteProduct();
  const { replace } = useRouter();

  function onDelete(id: string) {
    handleDelete(id);
    replace("/watchlist");
  }

  return (
    <div className="flex w-full flex-col items-center gap-12 px-4 text-sm">
      <article className="flex h-full flex-col items-center">
        <h1 className="mb-12 line-clamp-3 text-xl font-semibold">{name}</h1>
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
            <span>{current_price}</span>
            <span>{currency}</span>
          </div>
          <Radar className="text-primary size-8 animate-pulse" />
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
            <a href={url} target="_blank">
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
              className="border-destructive/50! bg-destructive/20! hover:border-destructive/60! hover:bg-destructive/30! h-10 min-w-50! rounded-sm text-base"
              variant="outline"
              disabled={isDeleting}
              onClick={() => onDelete(id)}
            >
              {isDeleting ? (
                <Loader2Icon className="size-5 shrink-0 animate-spin" />
              ) : (
                <div className="flex items-center gap-4">
                  <XIcon className="size-5" />
                  <span>Delete Product</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </article>
      <div className="w-full space-y-4">
        <h2 className="text-xl font-semibold">Price History</h2>
        <div className="h-60 rounded-md bg-red-500" />
        <small className="opacity-70">ID: {id}</small>
      </div>
    </div>
  );
}

export default Products;
