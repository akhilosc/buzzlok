import { ArrowUpRight, Timer } from "lucide-react";
import { sixtySecond } from "@/lib/buzzlok-data";

const rows = [
  { label: "What is it?", key: "what" },
  { label: "Why is it interesting?", key: "why" },
  { label: "Why does it matter?", key: "matters" },
  { label: "What can I do about it?", key: "action" },
] as const;

export function SixtySecond() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Timer className="size-3.5" /> 60 SEC
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Understand anything in sixty seconds
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            No long articles. Every important discovery answers four questions, then hands you a
            way to go deeper if you want to.
          </p>
          <a
            href="#feed"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-buzz"
          >
            Explore further <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="reveal glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Worth knowing</span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-live" /> verified
            </span>
          </div>
          <h3 className="mt-3 text-xl font-semibold">{sixtySecond.title}</h3>

          <div className="mt-6 space-y-4">
            {rows.map((row, i) => (
              <div
                key={row.key}
                className="reveal border-l-2 border-buzz/40 pl-4"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-buzz">
                  {row.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{sixtySecond[row.key]}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-full origin-left rounded-full" style={{ background: "var(--gradient-buzz)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
