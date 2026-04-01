import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import brafLogo from "@/assets/braf-logo.jpeg";

const HeroSection = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground relative overflow-hidden">
      {/* Subtle decorative circle */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-2xl" />

      <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
        <img src={brafLogo} alt="BRAF Ltd" className="h-24 w-auto mx-auto mb-6 rounded-xl" />
        <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">
          Where Learning Meets Fun
        </p>
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Unlock Your Child's
          <span className="text-accent"> Hidden Talent</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          BRAF Ltd detects youths' talents, develops them, and turns them into real income. Take our free 5-question quiz to find the perfect class.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={onStartQuiz} className="text-base px-8 py-6">
            Discover Your Talent
          </Button>
          <Button
            variant="hero-outline"
            size="lg"
            className="text-base px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </Button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50 hover:text-accent transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default HeroSection;
