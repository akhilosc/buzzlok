import { useState } from "react";
import { Check, Mail, Cpu, Sparkles, Activity, Database, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const items = [
  "Top 3 breakthrough AI tools launched today",
  "Benchmark shifts on SWE-bench, MMLU & LMSYS Chatbot Arena",
  "Open-source weights released on Hugging Face & GitHub",
  "Must-try agentic prompts and workflows for developers",
  "AI API price changes, free tier updates, and discounts",
];

const ecosystemMetrics = [
  {
    icon: Activity,
    title: "Continuous Radar Sweep",
    desc: "Automated ingestion pipeline scanning GitHub, Hugging Face & RSS every 10 min.",
    badge: "Active",
  },
  {
    icon: Cpu,
    title: "Benchmark Validation",
    desc: "Tracking live SWE-bench, LMSYS Arena, HumanEval and MMLU-Pro scores.",
    badge: "SOTA",
  },
  {
    icon: Database,
    title: "Open Weights & APIs",
    desc: "Deep indexing across local GGUF/Ollama weights and cloud API endpoints.",
    badge: "Indexed",
  },
  {
    icon: ShieldCheck,
    title: "100% Verified Quality",
    desc: "Capability checks, pricing classification, and direct developer links.",
    badge: "Verified",
  },
];

export function Daily() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setDone(true);
      toast.success("Welcome to Buzzlok AI Daily! 📬", {
        description: `We'll send your first 5-minute AI intelligence digest to ${email} tomorrow morning.`,
      });
    }
  };

  return (
    <section id="daily" className="w-full px-4 sm:px-6 lg:px-8 py-14 scroll-mt-20">
      <div className="w-full grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--gradient-buzz)" }}
          />
          <p className="relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
            <Mail className="size-4" /> Buzzlok Daily
          </p>
          <h2 className="relative mt-3 text-3xl font-bold sm:text-4xl">
            Five things worth knowing today
          </h2>

          <ol className="relative mt-6 space-y-2">
            {items.map((item, i) => (
              <li
                key={item}
                className="reveal flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="font-display text-sm font-bold text-buzz">{i + 1}</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ol>

          <form
            className="relative mt-7 flex flex-col gap-3 sm:flex-row"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-xl border border-input bg-secondary/50 px-4 py-3 text-sm outline-none transition-colors focus:border-buzz"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-buzz px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] cursor-pointer"
            >
              {done ? (
                <>
                  <Check className="size-4" /> You're in!
                </>
              ) : (
                "Get it free"
              )}
            </button>
          </form>
          <p className="relative mt-2 text-xs text-muted-foreground">
            Free, daily, one email. Unsubscribe any time. No spam ever.
          </p>
        </div>

        <div className="reveal glass-panel rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-buzz/30 bg-buzz/10 px-3 py-1 text-xs font-semibold text-buzz">
                <Sparkles className="size-3.5" /> Real-Time AI Radar
              </span>
              <span className="relative flex items-center gap-1.5 text-xs text-live font-medium">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-2 rounded-full bg-live animate-ping-ring" />
                  <span className="relative inline-flex size-2 rounded-full bg-live" />
                </span>
                Live Feed
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold">Automated Ecosystem Intelligence</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Buzzlok automatically scans and evaluates the latest autonomous agents, open-weights reasoning models, and developer tooling 24/7.
            </p>

            <div className="mt-5 space-y-2.5">
              {ecosystemMetrics.map(({ icon: Icon, title, desc, badge }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/50 p-3 transition-colors hover:border-buzz/40"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-buzz/10 text-buzz">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-foreground">{title}</p>
                      <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
                        {badge}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground leading-tight">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span>Powered by Buzzlok Automation Pipeline</span>
            <span className="text-buzz font-semibold">100% Free Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}
