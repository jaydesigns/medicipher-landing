import Features from "./_components/_sections/Features";
import HeroSection from "./_components/_sections/Hero";
import Navigation from "./_components/Navigation";
import ScrollSmootherWrapper from "./_components/ScrollSmoother";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-screen flex-col">
      <ScrollSmootherWrapper>
        <Navigation />
        <HeroSection />
        <Features />
      </ScrollSmootherWrapper>
    </main>
  );
}
