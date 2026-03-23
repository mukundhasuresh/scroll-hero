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
  const bgRef = useRef(null);

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
        x: 600,
        y: -120,
        scale: 1.5,
        rotation: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(imageRef.current, {
        filter: "blur(4px)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(bgRef.current, {
        x: -300,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        y: -100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(heroRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-hidden"
    >
      <div
        ref={titleRef}
        className="text-5xl md:text-7xl font-semibold tracking-[0.6em] text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
            <p className="text-sm opacity-60 mt-1 tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div
        ref={bgRef}
        className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-neutral-800 to-transparent"
      />

      <img
        ref={imageRef}
        src="/car.png"
        className="absolute bottom-10 w-[300px] object-contain will-change-transform"
        alt="car"
      />
    </section>
  );
}