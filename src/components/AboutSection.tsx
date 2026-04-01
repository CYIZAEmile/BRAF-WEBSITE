import { Target, TrendingUp, DollarSign } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Detect",
    description: "We identify each youth's unique natural talent through guided assessments.",
  },
  {
    icon: TrendingUp,
    title: "Develop",
    description: "Structured classes and mentorship to sharpen their skills to a professional level.",
  },
  {
    icon: DollarSign,
    title: "Earn",
    description: "We help young people turn their talents into sustainable income streams.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-accent font-medium tracking-widest uppercase text-sm text-center mb-2">
          How It Works
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
          Three Simple Steps
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-pink-light flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <step.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
