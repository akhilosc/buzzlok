import { useEffect, useState } from "react";
import { Bookmark, Loader2, Menu, Sparkles, X, Zap } from "lucide-react";
import { useBuzzlok } from "@/context/buzzlok-context";

const links = [
  { href: "#feed", label: "AI Directory" },
  { href: "#nearby", label: "Live AI Radar" },
  { href: "#daily", label: "Daily Digest" },
  { href: "#business", label: "Submit & Claim" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { savedIds, setIsSubmitModalOpen, setIsSavedDrawerOpen, setIsSidebarOpen, isSyncingRadar, syncLiveRadar } = useBuzzlok();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/90 backdrop-blur-md shadow-xs py-2.5"
          : "border-b border-transparent bg-background/50 backdrop-blur-sm py-3"
      }`}
    >
      <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile Categories Toggle */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-secondary/80 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary lg:hidden cursor-pointer"
            title="Open category menu"
          >
            <Menu className="size-4 text-buzz" />
            <span className="hidden sm:inline">Categories</span>
          </button>

          {/* Mobile Brand Logo (hidden on desktop because sidebar is present) */}
          <a href="#top" className="group flex items-center gap-2 lg:hidden">
            <img
              src="/logo-dark.png"
              alt="Buzzlok"
              className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-buzz/20 text-buzz px-1.5 py-0.5 border border-buzz/30">
              AI
            </span>
          </a>

          {/* Quick AI radar tag & Live Sync button */}
          <button
            type="button"
            disabled={isSyncingRadar}
            onClick={syncLiveRadar}
            title="Click to sync live AI radar across GitHub, Hugging Face, and Product feeds"
            className="inline-flex items-center gap-1.5 rounded-full border border-buzz/40 bg-buzz/10 px-3 py-1 text-[11px] font-semibold text-buzz transition-all hover:bg-buzz/20 cursor-pointer disabled:opacity-50"
          >
            {isSyncingRadar ? (
              <>
                <Loader2 className="size-3 animate-spin text-buzz" />
                <span>Syncing Radar...</span>
              </>
            ) : (
              <>
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-1.5 rounded-full bg-live animate-ping-ring" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-live" />
                </span>
                <span>⚡ Sync Live Radar</span>
              </>
            )}
          </button>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-buzz"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Saved Tools Button */}
          <button
            type="button"
            onClick={() => setIsSavedDrawerOpen(true)}
            className="relative inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:text-buzz cursor-pointer"
          >
            <Bookmark className={`size-3.5 ${savedIds.length > 0 ? "fill-buzz text-buzz" : ""}`} />
            <span className="hidden sm:inline">Saved Stack</span>
            {savedIds.length > 0 && (
              <span className="grid size-4 place-items-center rounded-full bg-buzz text-[10px] font-bold text-primary-foreground">
                {savedIds.length}
              </span>
            )}
          </button>

          {/* Submit AI Tool Button */}
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="hidden rounded-xl border border-border/80 bg-secondary px-3.5 py-1.5 text-xs font-semibold transition-all hover:border-buzz/50 hover:bg-buzz/10 hover:text-buzz sm:inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="size-3.5 text-buzz" /> Submit AI Tool
          </button>

          {/* Get Daily Button */}
          <a
            href="#daily"
            className="rounded-xl bg-buzz px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow-xs transition-transform duration-200 hover:scale-105"
          >
            AI Digest
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-8 place-items-center rounded-xl border border-border md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="glass-panel mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setIsSubmitModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-buzz hover:bg-buzz/10"
          >
            <Sparkles className="size-4" /> Submit a Buzz
          </button>
        </div>
      ) : null}
    </header>
  );
}
