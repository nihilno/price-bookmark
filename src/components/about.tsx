"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const isMobile = useMediaQuery({ maxWidth: 474 });
  useGSAP(() => {
    gsap.fromTo(
      "#about",
      { opacity: 0, yPercent: 30 },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        ease: "power1.inOut",
      },
    );
  }, []);

  return (
    <section
      id="about"
      className="relative container mx-auto h-dvh max-h-120 max-w-300 scroll-mt-32 overflow-hidden rounded-xl border border-dashed px-4 py-16 lg:max-h-140"
    >
      <Image
        src="/about.webp"
        alt="About"
        fill
        className="object-cover object-top md:object-center"
        priority
        quality={50}
      />
      <div className="text-foreground absolute inset-0 flex items-center justify-start bg-black/50">
        <h1
          className={cn(
            "p-0.5 text-start font-bold uppercase",
            isMobile ? "text-7xl leading-15" : "text-5xl leading-13",
            "sm:text-8xl sm:leading-20 md:text-9xl md:leading-25",
          )}
        >
          We <br /> stalk <br /> deals <br /> for <br />
          hunters.
        </h1>
      </div>
    </section>
  );
}

export default About;
