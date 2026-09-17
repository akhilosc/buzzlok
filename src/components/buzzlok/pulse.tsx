import { Activity } from "lucide-react";
import { pipeline, sources } from "@/lib/buzzlok-data";

export function Pulse() {
  return (
    <section id="pulse" className="relative overflow-hidden px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="reveal glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--gradient-buzz)" }}
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
                <Activity className="size-4" /> Buzzlok Pulse
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                The intelligence layer that never stops listening
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Pulse continuously gathers signals from legitimate sources, then turns the noise
                into a feed that actually changes through the day.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {sources.map((s, i) => (
                  <span
                    key={s}
                    className="animate-float rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground"
                    style={{ animationDelay: `${i * 380}ms` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <ol className="space-y-3">
                {pipeline.map((step, i) => (
                  <li
                    key={step}
                    className="reveal flex items-center gap-4 rounded-2xl border border-border bg-card/60 px-4 py-3"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-buzz/10 font-display text-sm font-bold text-buzz">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium">{step}</span>
                    <span className="h-1 w-20 overflow-hidden rounded-full bg-secondary sm:w-28">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${55 + i * 6}%`,
                          background: "var(--gradient-buzz)",
                        }}
                      />
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Result: a constantly changing discovery feed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
