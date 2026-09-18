import { Search, Cpu, Sparkles, ShieldCheck, HelpCircle, Layers, Zap, ArrowRight, Database } from "lucide-react";
import { useBuzzlok } from "@/context/buzzlok-context";

export function SeoDiscovery() {
  const { handleSearch, setActiveLane, setIsSubmitModalOpen } = useBuzzlok();

  const handleQuickSearch = (query: string) => {
    handleSearch(query);
    const feed = document.getElementById("feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pillars = [
    {
      icon: Search,
      title: "Task-First Discovery",
      description:
        "Skip the guesswork. Search by exact workflows—from autonomous code generation and mathematical reasoning to voice cloning, photorealistic rendering, and multimodal pipelines.",
      action: "Search Coding Agents",
      query: "coding agent",
    },
    {
      icon: Zap,
      title: "Real-Time AI Radar",
      description:
        "The AI landscape shifts daily. Buzzlok tracks live velocity, trending community bookmarks, and release milestones so you never rely on outdated listicles.",
      action: "Explore Trending AI",
      query: "trending",
    },
    {
      icon: Database,
      title: "Open Weights & APIs",
      description:
        "Filter precisely between open-source models ready for local deployment and managed enterprise APIs with benchmarked latency and token costs.",
      action: "View Open Source",
      query: "open source",
    },
    {
      icon: ShieldCheck,
      title: "Verified Intelligence",
      description:
        "Every listing undergoes capability checks, founder verification, and continuous uptime monitoring to ensure enterprise-grade reliability.",
      action: "Submit Your Tool",
      isSubmit: true,
    },
  ];

  const faqs = [
    {
      question: "How does Buzzlok help me discover the best AI tools?",
      answer:
        "Buzzlok is built as a real-time discovery engine. Instead of static catalogs, we index AI software, autonomous agents, and foundation models by specific capabilities, pricing tiers (Free, Freemium, Open Source, Enterprise), and live community adoption signals.",
    },
    {
      question: "Can I search for autonomous agents vs foundation models?",
      answer:
        "Yes. Buzzlok categorizes tools into distinct discovery lanes including Autonomous Agents (tools that execute shell/browser commands end-to-end), Deep Reasoning Models (hybrid thinking LLMs), and Generative Media tools.",
    },
    {
      question: "How frequently is the Buzzlok AI Radar updated?",
      answer:
        "Our index is monitored 24/7. New model releases, API updates, and verified community submissions are indexed continuously so builders always stay on the frontier of artificial intelligence.",
    },
  ];

  return (
    <section
      id="about-discovery"
      aria-label="AI Directory and Discovery Guide"
      className="w-full px-4 sm:px-6 lg:px-8 py-16 border-t border-border/40 bg-card/10"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-buzz/30 bg-buzz/10 px-3.5 py-1 text-xs font-semibold text-buzz">
            <Sparkles className="size-3.5" />
            <span>AI Discovery & Search Architecture</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Why Modern Builders & Teams Discover AI on <span className="text-gradient-buzz">Buzzlok</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            From solo developers to enterprise AI engineers, Buzzlok is engineered to connect you
            with the exact intelligence layer your workflows demand.
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass-panel group relative flex flex-col justify-between rounded-2xl p-6 border border-border/60 hover:border-buzz/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="size-11 rounded-xl bg-buzz/10 border border-buzz/20 text-buzz flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  {pillar.isSubmit ? (
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-buzz hover:underline cursor-pointer"
                    >
                      {pillar.action}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleQuickSearch(pillar.query || "")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-buzz hover:underline cursor-pointer"
                    >
                      {pillar.action}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Organic Search & Semantic Q&A */}
        <div className="rounded-3xl border border-border/60 bg-card/30 p-6 sm:p-10">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="size-5 text-buzz" />
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
              Frequently Asked Questions & Search Index Guide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-border/40 bg-background/50 p-5 space-y-2.5"
              >
                <h4 className="text-sm font-semibold text-foreground leading-snug">
                  {faq.question}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
