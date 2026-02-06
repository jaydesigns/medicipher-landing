import CTASection from "./_components/_sections/CTA";
import Features from "./_components/_sections/Features";
import FooterSection from "./_components/_sections/Footer";
import HeroSection from "./_components/_sections/Hero";
import ShowcaseSection from "./_components/_sections/Showcase";
import SlideSection from "./_components/_sections/Slide";
import Navigation from "./_components/Navigation";
import ScrollSmootherWrapper from "./_components/ScrollSmoother";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-screen flex-col">
      <ScrollSmootherWrapper>
        <Navigation />
        <HeroSection />
        <Features />
        <ShowcaseSection />
        <SlideSection />
        <CTASection />
        <FooterSection />
      </ScrollSmootherWrapper>
    </main>
  );
}
