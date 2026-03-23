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
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current?.querySelectorAll("span");

      // ✨ Intro Animation
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

      // 🎯 Main Timeline (scroll-based)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 🚗 Car Motion (acceleration feel)
      tl.to(carRef.current, {
        x: window.innerWidth * 0.65,
        scale: 1.25,
        rotation: 3,
        ease: "power2.out",
      });

      // ⚡ Speed Trail
      tl.to(
        trailRef.current,
        {
          width: 320,
          opacity: 0,
          ease: "none",
        },
        0
      );

      // 🧠 Depth effect
      tl.to(
        titleRef.current,
        {
          y: -140,
          opacity: 0.15,
          ease: "none",
        },
        0
      );

      tl.to(
        statsRef.current,
        {
          y: -100,
          opacity: 0,
          ease: "none",
        },
        0
      );

      // 🎬 Cinematic fade out
      tl.to(
        heroRef.current,
        {
          opacity: 0,
          ease: "none",
        },
        0.85
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="h-[200vh] bg-gradient-to-b from-black via-neutral-900 to-black text-white relative"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        
        {/* TITLE */}
        <div
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-[0.28em] leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]"
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

        {/* 🚗 CAR */}
        <img
          ref={carRef}
          src="/car.png"
          alt="car"
          className="absolute bottom-10 left-4 md:left-20 w-[180px] md:w-[300px] will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        />

        {/* ⚡ SPEED TRAIL */}
        <div
          ref={trailRef}
          className="absolute bottom-[72px] md:bottom-[90px] left-4 md:left-20 h-[4px] w-20 bg-white/40 blur-sm"
        />
      </div>
    </section>
  );
}