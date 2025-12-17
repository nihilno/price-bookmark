"use client";

import { GRID_ITEM } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cat, Cloud, Pin, Radar, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Grid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(".grid-item");

    gsap.fromTo(
      items,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power3.out",
        stagger: {
          each: 0.15,
          from: "start",
          grid: "auto",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: 1,
        },
      },
    );
  });

  return (
    <section
      ref={containerRef}
      id="grid"
      className="grid h-150 w-full scroll-mt-32 grid-cols-2 grid-rows-3 gap-4 px-2 text-sm sm:h-160 md:h-180 md:px-4 md:text-base xl:h-200"
    >
      <div
        className={cn(
          "border-muted-foreground/50 relative overflow-hidden border border-dashed",
          GRID_ITEM,
        )}
      >
        <h3>
          <div className="flex flex-col items-center gap-2">
            <Radar className="mb-1" />
            <span className="font-bold sm:text-lg">
              Precision Tracking
            </span>{" "}
            <br /> Real-time monitoring without noise.
          </div>
        </h3>
      </div>
      <div className={cn("fire-border", GRID_ITEM)}>
        <h3>
          <div className="flex flex-col items-center gap-2">
            <Pin className="mb-1" />
            <span className="font-bold sm:text-lg">Seamless Pinning</span>{" "}
            <br /> Save products in one click.
          </div>
        </h3>
      </div>
      <div className={cn("fire-border relative col-span-2", GRID_ITEM)}>
        <Image
          src="/cat-3.webp"
          alt="Privacy"
          fill
          className="overflow-hidden rounded-2xl object-cover"
        />
        <h3 className="absolute inset-0 flex size-full flex-col justify-center bg-black/25 p-4">
          <div className="flex flex-col items-center gap-2">
            <Cat className="mb-1" />
            <span className="font-bold sm:text-lg">
              Smart Alerts
            </span> <br /> Get notified only when prices change.
          </div>
        </h3>
      </div>
      <div className={cn("fire-border", GRID_ITEM)}>
        <h3>
          <div className="flex flex-col items-center gap-2">
            <Cloud className="mb-1" />
            <span className="font-bold sm:text-lg">
              Cross-platform Sync
            </span>{" "}
            <br />
            Your watchlist, everywhere.
          </div>
        </h3>
      </div>
      <div
        className={cn(
          "border-muted-foreground/50 relative overflow-hidden border-t border-b border-l border-dashed",
          GRID_ITEM,
        )}
      >
        <Image
          src="/cat-2.webp"
          alt="Privacy"
          fill
          className="overflow-hidden rounded-xl object-cover"
        />
        <h3 className="absolute inset-0 flex size-full flex-col justify-center bg-black/40 p-4">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="mb-1" />
            <span className="font-bold sm:text-lg">
              Privacy-First
            </span> <br /> We track products, not people.
          </div>
        </h3>
      </div>
    </section>
  );
}

export default Grid;
