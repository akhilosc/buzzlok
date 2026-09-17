import { useState } from "react";
import { MapPin } from "lucide-react";
import { aroundMe } from "@/lib/buzzlok-data";

const filters = ["Now", "Today", "This Weekend", "Nearby"];

export function AroundMe() {
  const [active, setActive] = useState("Now");

  return (
    <section id="nearby" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="reveal glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]">
            <div className="size-full [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:44px_44px]" />
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
                <MapPin className="size-4" /> Around me
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Your street, continuously read</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                    active === f
                      ? "border-buzz bg-buzz text-primary-foreground"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aroundMe.map((item, i) => (
              <div
                key={item.label}
                className="reveal group flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-buzz/40"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-xl">
                  {item.icon}
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-buzz">{item.count}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
                <span className="ml-auto relative flex size-2">
                  <span className="absolute inline-flex size-2 rounded-full bg-buzz animate-ping-ring" />
                  <span className="relative inline-flex size-2 rounded-full bg-buzz/70" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
