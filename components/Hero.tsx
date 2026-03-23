"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current?.querySelectorAll("span");

      gsap.from(letters, {
        opacity: 0,
        y: 40,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(statsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        delay: 0.5,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(imageRef.current, {
        rotation: 2,
        yoyo: true,
        repeat: -1,
        duration: 1.2,
        ease: "sine.inOut",
      });

      gsap.to(imageRef.current, {
        x: 400,
        y: -80,
        scale: 1.3,
        rotation: 6,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${trackRef.current?.scrollWidth}`,
          scrub: 1,
        },
      });

      gsap.to(trackRef.current, {
        x: () =>
          -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <div ref={trackRef} className="flex h-full">
        <div className="w-screen h-full flex flex-col justify-center items-center relative">
          <div
            ref={titleRef}
            className="text-5xl md:text-7xl font-semibold tracking-[0.6em] text-center"
          >
            {text.map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="flex gap-16 mt-16">
            {[
              { value: "98%", label: "Success Rate" },
              { value: "120+", label: "Clients" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div
                key={i}
                ref={(el) => (statsRef.current[i] = el!)}
                className="text-center"
              >
                <h2 className="text-3xl font-semibold">{stat.value}</h2>
                <p className="text-sm opacity-60 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <img
            ref={imageRef}
            src="/car.png"
            className="absolute bottom-10 w-[300px]"
            alt="car"
          />
        </div>

        <div className="w-screen h-full flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold">
            EXPERIENCE SPEED
          </h1>
        </div>
      </div>
    </section>
  );
}