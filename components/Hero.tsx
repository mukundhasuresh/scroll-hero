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
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
          end: "bottom top",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(carRef.current, {
        x: window.innerWidth * 0.65,
        scale: 1.3,
        rotation: 3,
        ease: "none",
      });

      tl.to(trailRef.current, { width: 400, opacity: 0 }, 0);
      tl.to(glowRef.current, { scale: 1.8, opacity: 0.2 }, 0);

      tl.to(titleRef.current, { y: -150, opacity: 0 }, 0);
      tl.to(statsRef.current, { y: -120, opacity: 0 }, 0);

      cardsRef.current.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
          },
          0.25 + i * 0.1
        );
      });

      tl.to(
        cardsRef.current,
        {
          opacity: 0,
          y: -60,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.75
      );

      ScrollTrigger.refresh();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="h-[160vh] bg-black text-white relative overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />

      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-20">
        
        <div
          ref={titleRef}
          className="
            w-full
            text-3xl 
            sm:text-5xl 
            md:text-7xl 
            lg:text-[90px]
            font-bold 
            tracking-[0.15em]
            leading-[1.1]
            whitespace-nowrap
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
            <div key={i} ref={(el) => (statsRef.current[i] = el!)}>
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
            md:w-[300px]
            z-10
            will-change-transform
          "
        />

        <div
          ref={trailRef}
          className="
            absolute 
            bottom-[80px] 
            left-4 
            md:left-20 
            h-[4px] 
            w-24 
            bg-white/40 
            blur-sm
          "
        />

        <div className="absolute inset-0 flex items-center justify-center z-20 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full">
            {[
              { value: "58%", label: "Increase in pick up point use", color: "bg-lime-400 text-black" },
              { value: "27%", label: "Increase in pick up point use", color: "bg-neutral-800 text-white" },
              { value: "23%", label: "Decreased in customer phone calls", color: "bg-sky-400 text-black" },
              { value: "40%", label: "Decreased in customer phone calls", color: "bg-orange-500 text-black" },
            ].map((card, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el!)}
                className={`p-6 md:p-8 rounded-2xl ${card.color}`}
              >
                <h2 className="text-3xl md:text-4xl font-bold">
                  {card.value}
                </h2>
                <p className="text-sm mt-2 opacity-80">
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}