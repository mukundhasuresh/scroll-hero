import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="h-screen bg-white text-black flex flex-col justify-center items-center px-6">
        <h1 className="text-3xl md:text-5xl font-semibold mb-6 text-center">
          Built for Speed. Designed for Impact.
        </h1>

        <p className="max-w-xl text-center text-gray-600">
          This animation demonstrates smooth scroll-based motion,
          performance optimization, and modern UI principles using
          GSAP and React.
        </p>
      </section>
    </main>
  );
}