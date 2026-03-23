"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const carRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current?.querySelectorAll("span");

      // ✨ Intro
      gsap.from(letters, {
        opacity: 0,
        y: 40,
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

      // 🎯 Timeline (better feel)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      tl.to(carRef.current, {
        x: window.innerWidth * 0.6,
        scale: 1.2,
        rotation: 2,
        ease: "none",
      });

      tl.to(
        titleRef.current,
        {
          y: -120,
          opacity: 0.2,
          ease: "none",
        },
        0
      );

      tl.to(
        statsRef.current,
        {
          y: -80,
          opacity: 0,
          ease: "none",
        },
        0
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="h-[200vh] bg-black text-white relative"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        
        {/* TITLE */}
        <div
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-[0.3em] leading-tight"
        >
          {text.map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* STATS */}
        <div className="flex gap-6 md:gap-16 mt-8 md:mt-12">
          {[
            { value: "98%", label: "Success Rate" },
            { value: "120+", label: "Clients" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div
              key={i}
              ref={(el) => (statsRef.current[i] = el!)}
            >
              <h2 className="text-xl md:text-3xl font-semibold">
                {stat.value}
              </h2>
              <p className="text-xs md:text-sm text-white/50">
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
          className="absolute bottom-10 left-4 md:left-20 w-[180px] md:w-[300px] will-change-transform"
        />
      </div>
    </section>
  );
}