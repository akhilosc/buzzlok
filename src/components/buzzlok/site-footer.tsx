import { Zap } from "lucide-react";

const columns = [
  {
    title: "Discover",
    links: ["Buzz Now", "Around You", "Trending", "What's New", "Events", "Places"],
  },
  { title: "Worth", links: ["Worth Knowing", "Worth Doing", "Worth Buying", "Deals", "Useful"] },
  { title: "Participate", links: ["Submit a Buzz", "Claim your business", "Advertise", "Buzzlok Daily"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-buzz text-primary-foreground">
                <Zap className="size-4" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold">
                Buzz<span className="text-buzz">lok</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The discovery layer for everyday life. Discover. Know. Explore. Do.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#feed"
                      className="text-sm text-muted-foreground transition-colors hover:text-buzz"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Buzzlok. A discovery platform, not a news website.
        </p>
      </div>
    </footer>
  );
}
