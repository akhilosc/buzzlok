import { useEffect, useState } from "react";
import { Bookmark, Menu, Sparkles, X, Zap } from "lucide-react";
import { useBuzzlok } from "@/context/buzzlok-context";
import { AILoader } from "@/components/buzzlok/ai-loader";

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
          ? "border-b border-border/80 bg-background/85 backdrop-blur-xl shadow-xs"
          : "bg-background/40 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button (Opens Slim/Full Sidebar) */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-xl border border-border/70 bg-card/60 p-2 text-foreground transition-colors hover:bg-secondary hover:text-buzz lg:hidden cursor-pointer"
            aria-label="Toggle navigation categories menu"
          >
            <Menu className="size-5" />
          </button>

          {/* Clean Dark Mode Logo */}
          <a href="#top" className="group flex items-center gap-2">
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
                <AILoader size="xs" variant="icon" />
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
