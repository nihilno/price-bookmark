"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cat } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Logo() {
  const pathname = usePathname();

  return (
    <Link href="/">
      <Button
        size="icon-lg"
        variant="outline"
        className={cn(
          "bg-foreground button-hover group size-12 cursor-pointer rounded-full border transition-all duration-100 ease-in-out hover:size-14 hover:border-0 hover:shadow-[0px_0px_11px_16px_#ffffff20] focus:size-14 focus:border-0 focus:shadow-[0px_0px_11px_16px_#ffffff20] focus-visible:size-14 focus-visible:border-0 focus-visible:shadow-[0px_0px_11px_16px_#ffffff20]",
          pathname === "/"
            ? "size-14 border-0 shadow-[0px_0px_11px_16px_#ffffff20]"
            : "",
        )}
        aria-label="Go to home page"
      >
        <Cat
          className={cn(
            "group-hover:text-primary size-8",
            pathname === "/" ? "text-primary" : "",
          )}
        />
      </Button>
    </Link>
  );
}

export default Logo;
