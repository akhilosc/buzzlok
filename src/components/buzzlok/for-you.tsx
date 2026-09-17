import { useState } from "react";
import { Heart } from "lucide-react";
import { interests } from "@/lib/buzzlok-data";

export function ForYou() {
  const [picked, setPicked] = useState<string[]>(["Food", "Local events", "Technology"]);

  const toggle = (item: string) =>
    setPicked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));

  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
            <Heart className="size-4" /> For you
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A feed that learns what you chase</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Searches, clicks, saves, location and chosen interests shape a personal discovery feed —
            the same platform, tuned to one person.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{picked.length}</span> interests
            selected · feed refreshes instantly
          </p>
        </div>

        <div className="reveal glass-panel flex flex-wrap gap-2 rounded-[2rem] p-6 sm:p-8">
          {interests.map((item) => {
            const on = picked.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggle(item)}
                className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:scale-[1.04] ${
                  on
                    ? "border-buzz bg-buzz/15 text-buzz"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
