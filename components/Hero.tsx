"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const carRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✨ Intro animation
      const letters = titleRef.current?.querySelectorAll("span");

      gsap.from(letters, {
        opacity: 0,
        y: 50,
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(statsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        delay: 0.4,
        duration: 0.6,
        ease: "power2.out",
      });

      // 🚗 Car subtle idle
      gsap.to(carRef.current, {
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });

      // 🎯 Horizontal scroll (MAIN)
      const totalWidth =
        trackRef.current!.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 🚗 Car movement synced with scroll
      gsap.to(carRef.current, {
        x: 500,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full bg-black text-white overflow-hidden"
    >
      {/* TRACK */}
      <div ref={trackRef} className="flex h-full">
        
        {/* LEFT PANEL */}
        <div className="w-screen h-full flex flex-col justify-center items-start px-20 relative">
          
          {/* TITLE */}
          <div
            ref={titleRef}
            className="text-5xl md:text-7xl font-semibold tracking-[0.5em] leading-[1.2]"
          >
            {text.map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* STATS */}
          <div className="flex gap-16 mt-12">
            {[
              { value: "98%", label: "Success Rate" },
              { value: "120+", label: "Clients" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div
                key={i}
                ref={(el) => (statsRef.current[i] = el!)}
              >
                <h2 className="text-3xl font-semibold">
                  {stat.value}
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CAR */}
          <img
            ref={carRef}
            src="/car.png"
            alt="car"
            className="absolute bottom-16 left-20 w-[280px] will-change-transform"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-screen h-full flex items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight">
            EXPERIENCE<br />SPEED
          </h1>
        </div>
      </div>
    </section>
  );
}