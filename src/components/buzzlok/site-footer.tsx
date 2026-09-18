import { Zap } from "lucide-react";
import { useBuzzlok } from "@/context/buzzlok-context";

export function SiteFooter() {
  const { setActiveLane, setIsSubmitModalOpen, setIsClaimModalOpen } = useBuzzlok();

  const handleLinkClick = (title: string, link: string) => {
    if (link === "Submit AI Tool" || link === "Submit a Buzz") {
      setIsSubmitModalOpen(true);
      return;
    }
    if (link === "Claim Founder Profile" || link === "Advertise AI") {
      setIsClaimModalOpen(true);
      return;
    }

    if (
      [
        "All AI Tools",
        "🔥 Trending Today",
        "⚡ New Launches",
        "🤖 Autonomous Agents",
        "🧠 Reasoning Models",
        "💸 Free & Open Source",
        "⭐ Editor's Choice",
      ].includes(link)
    ) {
      setActiveLane(link);
    }

    const feed = document.getElementById("feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  const columns = [
    {
      title: "AI Categories",
      links: [
        "AI Agents & Autonomy",
        "Coding & Dev Tools",
        "Reasoning & LLMs",
        "Image & 3D Gen",
        "Video & Motion AI",
        "Voice & Audio AI",
      ],
    },
    {
      title: "Discovery Lanes",
      links: [
        "🔥 Trending Today",
        "⚡ New Launches",
        "🤖 Autonomous Agents",
        "🧠 Reasoning Models",
        "💸 Free & Open Source",
        "⭐ Editor's Choice",
      ],
    },
    {
      title: "For Builders",
      links: ["Submit AI Tool", "Claim Founder Profile", "Advertise AI", "AI Digest"],
    },
  ];

  return (
    <footer className="w-full border-t border-border bg-card/20 px-4 sm:px-6 lg:px-8 py-14">
      <div className="w-full">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/logo-dark.png"
                alt="Buzzlok"
                className="h-8 w-auto object-contain"
              />
              <span className="text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-buzz/20 text-buzz px-1.5 py-0.5 border border-buzz/30">
                AI
              </span>
            </div>
            <p className="mt-4 max-w-xs text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The real-time discovery engine for artificial intelligence. Search verified AI tools,
              autonomous agents, open-weights reasoning models, and generative workflows built for your workflow.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wider text-buzz">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => handleLinkClick(col.title, link)}
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-buzz text-left cursor-pointer"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Buzzlok AI. The Real-Time AI & Agent Discovery Engine.
          </p>
          <p className="flex items-center gap-2">
            <span>Global AI Radar</span>
            <span>·</span>
            <span>Live Stream</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
