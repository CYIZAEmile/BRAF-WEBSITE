import { Music, Mic, Banknote, Medal, FlaskConical, MoreHorizontal } from "lucide-react";

const classes = [
  { icon: Music, name: "Performing Arts", desc: "Dance, acting, music & creative expression" },
  { icon: Mic, name: "Public Speaking", desc: "Debate, presentation & leadership communication" },
  { icon: Banknote, name: "Financial Education", desc: "Budgeting, investing & entrepreneurship basics" },
  { icon: Medal, name: "Games Refereeing", desc: "Sports officiating, rules & fair play" },
  { icon: FlaskConical, name: "Sciences", desc: "STEM exploration, experiments & innovation" },
  { icon: MoreHorizontal, name: "Others", desc: "Tailored programs for unique talents" },
];

const ClassesSection = () => {
  return (
    <section id="classes" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-accent font-medium tracking-widest uppercase text-sm text-center mb-2">
          Our Programs
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
          Classes We Offer
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c, i) => (
            <div
              key={i}
              className="bg-background rounded-xl p-6 border border-border hover:border-accent/40 hover:shadow-lg transition-all group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-light flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <c.icon className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
