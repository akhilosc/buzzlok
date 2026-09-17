import { useEffect, useState } from "react";
import { Menu, Zap } from "lucide-react";

const links = [
  { href: "#feed", label: "Discover" },
  { href: "#pulse", label: "Pulse" },
  { href: "#nearby", label: "Around You" },
  { href: "#daily", label: "Daily" },
  { href: "#business", label: "For business" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass-panel" : "border border-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2">
          <span className="relative grid size-9 place-items-center rounded-xl bg-buzz text-primary-foreground">
            <Zap className="size-5" strokeWidth={2.5} />
            <span className="absolute inset-0 rounded-xl border border-buzz animate-ping-ring" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Buzz<span className="text-buzz">lok</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="story-link text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#submit"
            className="hidden rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary sm:inline-flex"
          >
            Submit a Buzz
          </a>
          <a
            href="#daily"
            className="rounded-xl bg-buzz px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-105"
          >
            Get Daily
          </a>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-xl border border-border md:hidden"
          >
            <Menu className="size-4" />
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
              className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
