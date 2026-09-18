import { useEffect, useState } from "react";
import { ArrowRight, Flame, Loader2, RefreshCw, Search, Sparkles, X, Zap } from "lucide-react";
import { popularTasks, searchPrompts } from "@/lib/buzzlok-data";
import { useBuzzlok } from "@/context/buzzlok-context";

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length]!;
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const delay = done ? 1800 : cleared ? 250 : deleting ? 20 : 40;
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
  const { searchQuery, setSearchQuery, discoveries, isSyncingRadar, syncLiveRadar } = useBuzzlok();

  const [inputVal, setInputVal] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);

  // Sync external search query changes
  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    const feed = document.getElementById("feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTaskClick = (query: string, label: string) => {
    const next = searchQuery.toLowerCase() === query.toLowerCase() ? "" : query;
    setInputVal(next);
    setSearchQuery(next);
    const feed = document.getElementById("feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="top" className="relative w-full px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8">
      <div className="relative w-full text-center">
        {/* Live Status Pill & Sync Button */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            disabled={isSyncingRadar}
            onClick={syncLiveRadar}
            title="Click to trigger live radar sync across GitHub, Hugging Face, and Product feeds"
            className="glass-panel group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold text-muted-foreground shadow-xs transition-all hover:border-buzz/60 hover:text-foreground hover:scale-105 cursor-pointer disabled:opacity-50"
          >
            {isSyncingRadar ? (
              <>
                <Loader2 className="size-3 animate-spin text-buzz" />
                <span className="text-buzz font-bold">Syncing Live AI Radar...</span>
              </>
            ) : (
              <>
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-2 rounded-full bg-live animate-ping-ring" />
                  <span className="relative inline-flex size-2 rounded-full bg-live" />
                </span>
                <span className="text-foreground font-bold">⚡ Live Intelligence Radar</span>
                <span className="text-border">·</span>
                <span className="text-buzz font-medium group-hover:underline">Click to Sync Feeds</span>
              </>
            )}
          </button>
        </div>

        {/* Buzzlok Option C Headline */}
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Find the Intelligence That Moves{" "}
          <span className="text-gradient-buzz">Your World</span>.
        </h1>

        <p className="mx-auto mt-2 max-w-3xl text-xs sm:text-base text-muted-foreground leading-relaxed">
          The real-time discovery engine for artificial intelligence. Search verified AI tools,
          autonomous agents, open-weights reasoning models, and generative workflows built for your workflow.
        </p>

        {/* High-Intent Search Bar */}
        <form
          role="search"
          aria-label="Search AI tools, agents, and tasks"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(inputVal || typed);
          }}
          className={`glass-panel mx-auto mt-5 flex max-w-3xl items-center gap-2 rounded-2xl p-2 pl-4 text-left shadow-md transition-all duration-300 ${
            isFocused ? "ring-2 ring-buzz border-buzz/60 shadow-lg" : "hover:border-buzz/40"
          }`}
        >
          <Search className="size-5 shrink-0 text-buzz" aria-hidden="true" />
          <div className="relative flex-1">
            <input
              type="search"
              id="search-input"
              name="q"
              aria-label="What task do you want an AI to solve?"
              value={inputVal}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                setInputVal(e.target.value);
                setSearchQuery(e.target.value);
              }}
              placeholder={`What do you want an AI to do? (e.g. ${typed})`}
              className="w-full bg-transparent py-1.5 text-xs text-foreground outline-none placeholder:text-muted-foreground/60 sm:text-sm font-medium"
            />
            {inputVal && (
              <button
                type="button"
                aria-label="Clear search input"
                onClick={() => {
                  setInputVal("");
                  setSearchQuery("");
                }}
                className="absolute right-1 top-2 text-muted-foreground hover:text-foreground"
                title="Clear"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            aria-label="Submit search query"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-buzz px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>

        {/* Popular Tasks Cloud (TAAFT style) */}
        <div className="mx-auto mt-4 max-w-5xl">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground mb-2">
            <Sparkles className="size-3 text-buzz" />
            <span>POPULAR AI TASKS & CAPABILITIES:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {popularTasks.map((t) => {
              const isActive =
                searchQuery.toLowerCase().includes(t.query.toLowerCase()) ||
                searchQuery.toLowerCase() === t.label.toLowerCase();

              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => handleTaskClick(t.query, t.label)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "border-buzz bg-buzz text-primary-foreground shadow-xs font-semibold scale-105"
                      : "border-border/70 bg-card/60 text-muted-foreground hover:border-buzz/50 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
