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
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current?.querySelectorAll("span");

      gsap.from(letters, {
        opacity: 0,
        y: 60,
        stagger: 0.04,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(statsRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        delay: 0.5,
        duration: 0.7,
        ease: "power2.out",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(carRef.current, {
        x: window.innerWidth * 0.7,
        scale: 1.35,
        rotation: 4,
        ease: "power3.out",
      });

      tl.to(
        trailRef.current,
        {
          width: 400,
          opacity: 0,
          ease: "none",
        },
        0
      );

      tl.to(
        glowRef.current,
        {
          scale: 1.8,
          opacity: 0.2,
          ease: "none",
        },
        0
      );

      tl.to(
        titleRef.current,
        {
          y: -160,
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="h-[150vh] bg-black text-white relative overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />

      <div className="sticky top-0 h-screen flex flex-col justify-center items-start px-6 md:px-20">
        
        <div
          ref={titleRef}
          className="
            w-full
            max-w-[1400px]
            text-3xl 
            sm:text-5xl 
            md:text-7xl 
            lg:text-[90px]
            font-bold 
            tracking-[0.15em]
            leading-[1.1]
            whitespace-nowrap
            overflow-hidden
          "
        >
          {text.map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

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

        <img
          ref={carRef}
          src="/car.png"
          alt="car"
          className="
            absolute 
            bottom-10 
            left-4 
            md:left-20 
            w-[160px] 
            sm:w-[200px]
            md:w-[320px]
            will-change-transform
            drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]
          "
        />

        <div
          ref={trailRef}
          className="
            absolute 
            bottom-[72px] 
            md:bottom-[100px] 
            left-4 
            md:left-20 
            h-[4px] 
            w-24 
            bg-white/40 
            blur-sm
          "
        />
      </div>
    </section>
  );
}