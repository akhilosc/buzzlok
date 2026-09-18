import { Heart, Sparkles } from "lucide-react";
import { interests } from "@/lib/buzzlok-data";
import { useBuzzlok } from "@/context/buzzlok-context";

export function ForYou() {
  const { selectedInterests, toggleInterest, discoveries } = useBuzzlok();

  const matchingCount = discoveries.filter((d) =>
    d.interests.some((it) => selectedInterests.includes(it)),
  ).length;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14">
      <div className="w-full grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
            <Heart className="size-4" /> Personalized AI Radar
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            A feed tuned to your AI specialization
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Select your workflows and technical focus areas — from autonomous software agents and
            frontier reasoning models to voice cloning and local inference. Buzzlok customizes your
            daily discovery radar to your builder stack.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-xl bg-buzz/10 border border-buzz/30 px-3 py-1.5 text-xs text-buzz font-medium">
              <strong className="font-bold text-foreground">{selectedInterests.length}</strong>{" "}
              specializations active
            </span>
            <span className="rounded-xl bg-accent/10 border border-accent/30 px-3 py-1.5 text-xs text-accent font-medium">
              <strong className="font-bold text-foreground">{matchingCount}</strong> AI tools
              matched
            </span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Selected tags are highlighted with a{" "}
            <span className="text-accent font-semibold">✨ In Your Stack</span> badge in the
            directory.
          </p>
        </div>

        <div className="reveal glass-panel flex flex-wrap gap-2.5 rounded-[2rem] p-6 sm:p-8">
          {interests.map((item) => {
            const on = selectedInterests.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleInterest(item)}
                className={`rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-[1.04] ${
                  on
                    ? "border-buzz bg-buzz/20 text-buzz font-semibold shadow-sm ring-1 ring-buzz/40"
                    : "border-border bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {on ? `✓ ${item}` : item}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
