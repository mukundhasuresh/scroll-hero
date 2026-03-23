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
        x: 500,
        y: -100,
        scale: 1.4,
        rotation: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col justify-center items-center bg-black text-white overflow-hidden"
    >
      <div
        ref={titleRef}
        className="text-4xl md:text-6xl tracking-[0.5em] flex flex-wrap justify-center"
      >
        {text.map((char, i) => (
          <span key={i}>{char === " " ? "\u00A0" : char}</span>
        ))}
      </div>

      <div className="flex gap-10 mt-10">
        {["98% Success", "120+ Clients", "24/7 Support"].map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el!)}
            className="text-center"
          >
            <h2 className="text-2xl font-bold">{stat.split(" ")[0]}</h2>
            <p className="text-sm opacity-70">
              {stat.split(" ").slice(1).join(" ")}
            </p>
          </div>
        ))}
      </div>

      <div
        ref={imageRef}
        className="absolute bottom-10 w-40 h-20 bg-white rounded-lg"
      ></div>
    </section>
  );
}