import { ArrowUpRight, CheckCircle2, Sparkles, Timer } from "lucide-react";
import { sixtySecond } from "@/lib/buzzlok-data";
import { useBuzzlok } from "@/context/buzzlok-context";

const rows = [
  { label: "What is it?", key: "what" },
  { label: "Why is it interesting?", key: "why" },
  { label: "Why does it matter?", key: "matters" },
  { label: "What can I do about it?", key: "action" },
] as const;

export function SixtySecond() {
  const { setSelectedDiscovery, discoveries } = useBuzzlok();

  const handleDeepDive = () => {
    // Open discovery details if matched, or first discovery
    const matched = discoveries.find((d) => d.id === "d1") || discoveries[0];
    if (matched) setSelectedDiscovery(matched);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Timer className="size-3.5" /> 60-SECOND AI SPOTLIGHT
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Today's Breakthrough Breakdown</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Get the full technical & product picture in 60 seconds — what it is, why it's buzzworthy
            in the AI ecosystem, why it matters for developers, and how to start testing it today.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              onClick={handleDeepDive}
              className="inline-flex items-center gap-1.5 rounded-xl bg-buzz px-4 py-2 text-xs font-bold text-primary-foreground hover:scale-105 transition-transform shadow-sm cursor-pointer"
            >
              <Sparkles className="size-3.5" /> Explore Full Model Card
            </button>
            <a
              href="#feed"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-buzz hover:underline"
            >
              Back to AI Directory <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="reveal glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-semibold text-buzz uppercase tracking-wider">
              Spotlight AI Model
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-live">
              <CheckCircle2 className="size-3.5" /> verified
            </span>
          </div>
          <h3 className="mt-3 text-xl font-bold">{sixtySecond.title}</h3>

          <div className="mt-6 space-y-3.5">
            {rows.map((row, i) => (
              <div
                key={row.key}
                className="reveal border-l-2 border-buzz/40 pl-4 py-0.5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-buzz">{row.label}</p>
                <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                  {sixtySecond[row.key]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full w-full origin-left rounded-full"
              style={{ background: "var(--gradient-buzz)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
