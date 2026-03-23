import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* 🔥 NEW TRANSITION SECTION */}
      <section className="h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
        
        {/* SPEED LINES */}
        <div className="absolute inset-0 opacity-20">
          <div className="speed-lines"></div>
        </div>

        {/* TEXT */}
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-center">
          Feel the Motion
        </h1>

        <p className="text-white/60 max-w-xl text-center">
          Every scroll is engineered for fluidity, precision,
          and seamless interaction.
        </p>

      </section>

      {/* FINAL SECTION */}
      <section className="h-screen bg-white text-black flex flex-col justify-center items-center px-6">
        
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-center">
          Built for Speed.
        </h1>

        <p className="max-w-xl text-center text-gray-600">
          This animation demonstrates smooth scroll-based motion,
          performance optimization, and modern UI principles.
        </p>

      </section>
    </main>
  );
}