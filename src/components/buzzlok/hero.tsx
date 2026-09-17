import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Search, Sparkles } from "lucide-react";
import { searchPrompts } from "@/lib/buzzlok-data";

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length]!;
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const delay = done ? 1500 : cleared ? 200 : deleting ? 22 : 45;
    const timer = setTimeout(() => {
      if (done) return setDeleting(true);
      if (cleared) {
        setDeleting(false);
        return setIndex((i) => i + 1);
      }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(searchPrompts);

  return (
    <section id="top" className="relative overflow-hidden px-4 pt-36 pb-20 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18rem] size-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-buzz)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="animate-orbit size-[42rem] rounded-full border border-border/50" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 rounded-full bg-live animate-ping-ring" />
            <span className="relative inline-flex size-2 rounded-full bg-live" />
          </span>
          Buzzlok Pulse is live · 1,284 discoveries updated today
        </span>

        <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
          The discovery layer for
          <br />
          <span className="text-gradient-buzz">everyday life</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          What's happening, what's nearby, what's new, what's trending and what's worth your
          attention — connected in one constantly moving feed.
        </p>

        <div className="glass-panel mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl p-2 pl-4 text-left">
          <Search className="size-5 shrink-0 text-buzz" />
          <p className="flex-1 truncate py-2 text-sm text-foreground/90 sm:text-base">
            {typed}
            <span className="animate-caret ml-0.5 inline-block w-0.5 bg-buzz align-middle">
              &nbsp;
            </span>
          </p>
          <button
            type="button"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-buzz px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
          >
            Discover
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-accent" />
          Bangalore
          <span className="text-border">|</span>
          {["Now", "Today", "This Weekend", "Nearby"].map((chip, i) => (
            <button
              key={chip}
              type="button"
              className={`rounded-full border px-3 py-1 transition-colors ${
                i === 0
                  ? "border-buzz/60 bg-buzz/10 text-buzz"
                  : "border-border hover:bg-secondary hover:text-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <p className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-buzz" />
          Discover. Know. Explore. Do.
        </p>
      </div>
    </section>
  );
}
