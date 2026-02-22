import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import MemorySection from "@/components/MemorySection";
import BalloonSection from "@/components/BalloonSection";
import Dream from "@/components/Dream";
import LoveSection from "@/components/LoveSection";
import SurpriseReveal from "@/components/SurpriseReveal";
import FinalMessage from "@/components/FinalMessage";
import BackgroundAudio from "@/components/BackgroundAudio";

const Index = () => {
  return (
    <main className="bg-romantic overflow-x-hidden">
      <BackgroundAudio />
      <Hero />
      <VideoSection />
      <MemorySection />
      <BalloonSection />
      <Dream />
      <LoveSection />
      <SurpriseReveal />
      <FinalMessage />
    </main>
  );
};

export default Index;
