"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Bell, Cat, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

function Badges() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(".badge-item");

    gsap.set(items, { opacity: 0, y: 40 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section className="grid grid-cols-2 gap-10" ref={sectionRef}>
      <div
        id="badges"
        className="relative my-64 flex w-full scroll-mt-24 flex-col items-start gap-64"
      >
        <div className="badge-item bg-foreground/10 flex flex-col items-center gap-2 self-end rounded-full px-5 py-2 shadow-sm transition hover:shadow-md">
          <Cat />
          <div className="flex items-center gap-2">
            <FaCheckCircle className="h-5 w-5" />
            <span className="font-medium">Free to Start</span>
          </div>
        </div>
        <div className="badge-item bg-foreground/10 flex flex-col items-center gap-2 rounded-2xl px-5 py-2 shadow-sm transition hover:shadow-md">
          <Bell />
          <div className="flex items-center gap-2">
            <FaCheckCircle className="h-5 w-5" />
            <span className="font-medium">Instant notifications</span>
          </div>
        </div>

        <div className="badge-item bg-foreground/10 flex flex-col items-center gap-2 rounded-full px-5 py-2 shadow-sm transition hover:shadow-md">
          <ShoppingBag />
          <div className="flex items-center gap-2">
            <FaCheckCircle className="h-5 w-5" />
            <span className="font-medium">Work across major stores</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/cat-badge.webp"
          alt="Cat Catcher"
          fill
          className="jump translate-y-50 scale-140 object-contain object-center"
        />
      </div>
    </section>
  );
}

export default Badges;
