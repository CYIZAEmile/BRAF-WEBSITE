import { useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ClassesSection from "@/components/ClassesSection";
import TalentQuiz from "@/components/TalentQuiz";
import Footer from "@/components/Footer";

const Index = () => {
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar onStartQuiz={scrollToQuiz} />
      <HeroSection onStartQuiz={scrollToQuiz} />
      <AboutSection />
      <ClassesSection />
      <TalentQuiz quizRef={quizRef} />
      <Footer />
    </div>
  );
};

export default Index;
