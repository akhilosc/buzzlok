import { useMemo, useState } from "react";
import { Bookmark, Compass, Flame, Share2 } from "lucide-react";
import { discoveries, lanes } from "@/lib/buzzlok-data";

export function DiscoveryFeed() {
  const [lane, setLane] = useState<string>("Buzz Now");
  const [saved, setSaved] = useState<string[]>([]);

  const visible = useMemo(
    () => discoveries.filter((d) => d.lanes.includes(lane)),
    [lane],
  );

  return (
    <section id="feed" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
              The discovery feed
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              What's worth discovering right now?
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Every business, event, product, trend, place, deal and useful find arrives as the same
            simple Discovery Card.
          </p>
        </div>

        <div className="reveal mt-8 flex flex-wrap gap-2">
          {lanes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLane(item)}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                lane === item
                  ? "border-buzz bg-buzz text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((d, i) => {
            const isSaved = saved.includes(d.id);
            return (
              <article
                key={d.id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="group glass-panel animate-fade-in relative overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-buzz/40"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-sweep"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in oklab, var(--buzz) 14%, transparent), transparent)",
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-buzz/40 bg-buzz/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-buzz">
                    {d.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Flame className="size-3.5 text-accent" />
                    {d.heat}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.summary}</p>

                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${d.heat}%`, background: "var(--gradient-buzz)" }}
                  />
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  {d.place} · {d.kind} · {d.age}
                </p>

                <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-medium transition-colors hover:bg-buzz hover:text-primary-foreground"
                  >
                    <Compass className="size-3.5" /> Explore
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSaved((s) => (s.includes(d.id) ? s.filter((x) => x !== d.id) : [...s, d.id]))
                    }
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors ${
                      isSaved
                        ? "bg-buzz/15 text-buzz"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Bookmark className={`size-3.5 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Share2 className="size-3.5" /> Share
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
