import { Cpu, ArrowRight, Sparkles } from "lucide-react";
import { aroundMeByFilter, DiscoveryKind } from "@/lib/buzzlok-data";
import { useBuzzlok } from "@/context/buzzlok-context";

const filters: { key: string; label: string }[] = [
  { key: "Now", label: "Active Now" },
  { key: "Today", label: "Today's Releases" },
  { key: "This Weekend", label: "Trending Repos" },
  { key: "Nearby", label: "Local / Edge AI" },
];

const labelToKind: Record<string, DiscoveryKind> = {
  "Autonomous Agents": "Agent",
  "Coding Co-Pilots": "Coding",
  "Reasoning Models": "Reasoning",
  "Generative Video": "Vision",
  "Voice Synthesizers": "Audio",
  "Open Weights": "OpenSource",
  "New Launches Today": "New",
  "Model Checkpoints": "OpenSource",
  "Price Drops & Free Tiers": "Tool",
  "Leaderboard Climbers": "Reasoning",
  "Mobile AI Apps": "Tool",
  "Trending on X / Reddit": "Trend",
  "Hackathon Releases": "Agent",
  "Developer SDKs": "Coding",
  "Creative Workflows": "Vision",
  "Research Papers": "Reasoning",
  "Audio & Music Demos": "Audio",
  "AI Safety Audits": "Reasoning",
  "Local LLMs (Ollama)": "OpenSource",
  "Fast LPU Inference": "Tool",
  "Quantized GGUF Models": "OpenSource",
  "Self-Hosted Web UIs": "OpenSource",
  "VS Code Extensions": "Coding",
  "Local Browser Agents": "Agent",
};

export function AroundMe() {
  const { selectedTimeframe, setSelectedTimeframe, setActiveCategory } = useBuzzlok();

  const currentItems = aroundMeByFilter[selectedTimeframe] ?? aroundMeByFilter["Now"] ?? [];

  const handleItemClick = (label: string) => {
    const kind = labelToKind[label];
    if (kind) {
      setActiveCategory(kind);
    }
    const feed = document.getElementById("feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="nearby" className="w-full px-4 sm:px-6 lg:px-8 py-14 scroll-mt-20">
      <div className="w-full">
        <div className="reveal glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]">
            <div className="size-full [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:44px_44px]" />
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
                <Cpu className="size-4" /> AI Ecosystem Radar · Live Intelligence
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                The AI Frontier, Continuously Scanned
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setSelectedTimeframe(f.key)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    selectedTimeframe === f.key
                      ? "border-buzz bg-buzz text-primary-foreground shadow-sm"
                      : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleItemClick(item.label)}
                className="reveal group flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-buzz/60 hover:bg-card hover:shadow-md cursor-pointer"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-2xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-display text-2xl font-bold text-buzz">{item.count}</p>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {item.change}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-foreground/90">{item.label}</p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-buzz" />
              </button>
            ))}
          </div>

          <p className="relative mt-6 text-center text-xs text-muted-foreground">
            Click any signal to instantly filter the AI discovery feed by capability and ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}
