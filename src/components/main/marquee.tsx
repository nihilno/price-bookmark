"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { SPONSORS } from "@/lib/consts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function MainMarquee() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      marqueeRef.current,
      { opacity: 0, xPercent: 10, yPercent: 10, scale: 0.75 },
      {
        opacity: 1,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        ease: "back.out",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <div
      className="bg-primary/50 mt-48 mb-32 flex size-full items-center justify-center backdrop-blur-2xl"
      ref={marqueeRef}
    >
      <Marquee id="marquee">
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent className="py-2">
          {SPONSORS.map(({ name, img }) => (
            <MarqueeItem className="h-25 w-25" key={name}>
              <Image
                alt={name}
                className="overflow-hidden rounded-full"
                src={img}
                width={100}
                height={100}
              />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}

export default MainMarquee;
