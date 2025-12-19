"use client";

import { Button } from "@/components/ui/button";
import { CARD_STYLE } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Home, RotateCw, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NotFound() {
  const { refresh } = useRouter();

  return (
    <section className={cn(CARD_STYLE, "h-full")}>
      <div className="flex flex-col items-center justify-center text-center">
        <XCircle className="text-muted-foreground mb-4 h-12 w-12" />
        <h2 className="mb-2 text-2xl font-semibold">Page not found</h2>
        <p className="mt-4 max-w-sm text-sm opacity-60">
          The page you&apos;re chasing has wandered off or curled up for a nap.
          Try giving it a refresh, or go back home
        </p>
        <div className="mt-6 space-x-2">
          <Button size={"sm"} onClick={() => refresh()} variant="outline">
            <RotateCw /> <span>Reload</span>
          </Button>
          <Link href="/">
            <Button size={"sm"} variant={"secondary"}>
              <Home /> <span>Go Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
