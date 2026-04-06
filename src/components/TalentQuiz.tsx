import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    question: "What does your child enjoy most in free time?",
    options: [
      { label: "Singing, dancing or acting", talent: "Performing Arts" },
      { label: "Talking, debating or storytelling", talent: "Public Speaking" },
      { label: "Saving money, trading or business ideas", talent: "Financial Education" },
      { label: "Watching sports and knowing all the rules", talent: "Games Refereeing" },
      { label: "Experimenting, building or asking 'why?'", talent: "Sciences" },
      { label: "Something else entirely", talent: "Others" },
    ],
  },
  {
    question: "How does your child prefer to express themselves?",
    options: [
      { label: "Through performance and creativity", talent: "Performing Arts" },
      { label: "Through words and persuasion", talent: "Public Speaking" },
      { label: "Through numbers and planning", talent: "Financial Education" },
      { label: "Through fairness and organisation", talent: "Games Refereeing" },
      { label: "Through logic and discovery", talent: "Sciences" },
      { label: "In a unique way I can't categorise", talent: "Others" },
    ],
  },
  {
    question: "What kind of group role does your child naturally take?",
    options: [
      { label: "The entertainer", talent: "Performing Arts" },
      { label: "The spokesperson", talent: "Public Speaking" },
      { label: "The negotiator or planner", talent: "Financial Education" },
      { label: "The rule-keeper or mediator", talent: "Games Refereeing" },
      { label: "The problem-solver", talent: "Sciences" },
      { label: "Hard to define — they're unique", talent: "Others" },
    ],
  },
  {
    question: "What would your child most likely watch for hours?",
    options: [
      { label: "Talent shows and music videos", talent: "Performing Arts" },
      { label: "TED talks and interviews", talent: "Public Speaking" },
      { label: "Business and finance content", talent: "Financial Education" },
      { label: "Sports matches and highlights", talent: "Games Refereeing" },
      { label: "Science documentaries and experiments", talent: "Sciences" },
      { label: "Something niche or unexpected", talent: "Others" },
    ],
  },
  {
    question: "What best describes your child's dream future?",
    options: [
      { label: "Performing on a big stage", talent: "Performing Arts" },
      { label: "Leading and inspiring people", talent: "Public Speaking" },
      { label: "Running a successful business", talent: "Financial Education" },
      { label: "Being part of professional sports", talent: "Games Refereeing" },
      { label: "Making a scientific breakthrough", talent: "Sciences" },
      { label: "Creating something no one has seen", talent: "Others" },
    ],
  },
];

interface TalentQuizProps {
  quizRef: React.RefObject<HTMLDivElement>;
}

const TalentQuiz = ({ quizRef }: TalentQuizProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Tally results
      const tally: Record<string, number> = {};
      newAnswers.forEach((a) => {
        tally[a] = (tally[a] || 0) + 1;
      });
      const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
      setResult(top);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setSelected(answers[answers.length - 1]);
      setAnswers(answers.slice(0, -1));
      setCurrentQ(currentQ - 1);
    }
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setName("");
    setEmail("");
    setSubmitted(false);
  };

  return (
    <section ref={quizRef} id="quiz" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <p className="text-accent font-medium tracking-widest uppercase text-sm text-center mb-2">
          Free Assessment
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Discover Your Talent
        </h2>

        <div className="bg-card rounded-2xl border border-border p-8 md:p-10">
          {!result ? (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  Question {currentQ + 1} of {questions.length}
                </span>
                <div className="flex gap-1.5">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-8 rounded-full transition-colors ${
                        i <= currentQ ? "bg-accent" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-6">
                {questions[currentQ].question}
              </h3>

              <div className="space-y-3 mb-8">
                {questions[currentQ].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelected(opt.talent)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                      selected === opt.talent
                        ? "border-accent bg-pink-light text-foreground"
                        : "border-border hover:border-accent/40 text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentQ === 0}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button variant="hero" onClick={handleNext} disabled={!selected}>
                  {currentQ < questions.length - 1 ? "Next" : "See Result"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </>
          ) : !submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-pink-light flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Your Talent Match</h3>
              <p className="text-3xl font-bold text-accent mb-4">{result}</p>
              <p className="text-muted-foreground mb-8">
                Based on your answers, we recommend our <strong>{result}</strong> class.
                Submit your details and we'll get in touch!
              </p>

              <form onSubmit={handleSubmitEnquiry} className="space-y-4 max-w-sm mx-auto text-left">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter your email"
                  />
                </div>
                <Button variant="hero" type="submit" className="w-full py-6">
                  Submit Enquiry
                </Button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-pink-light flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Thank You, {name}!</h3>
              <p className="text-muted-foreground mb-6">
                We've received your enquiry for <strong>{result}</strong>. Our team will contact you at{" "}
                <strong>{email}</strong> shortly.
              </p>
              <Button variant="ghost" onClick={restart} className="text-accent">
                Take Quiz Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TalentQuiz;
