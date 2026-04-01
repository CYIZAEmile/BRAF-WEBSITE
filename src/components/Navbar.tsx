import { Button } from "@/components/ui/button";
import brafLogo from "@/assets/braf-logo.jpeg";

const Navbar = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-5xl">
        <img src={brafLogo} alt="BRAF Ltd" className="h-12 w-auto" />
        <div className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/70">
          <a href="#about" className="hover:text-primary-foreground transition-colors">How It Works</a>
          <a href="#classes" className="hover:text-primary-foreground transition-colors">Classes</a>
          <a href="#quiz" className="hover:text-primary-foreground transition-colors">Quiz</a>
        </div>
        <Button variant="hero" size="sm" onClick={onStartQuiz}>
          Start Quiz
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
