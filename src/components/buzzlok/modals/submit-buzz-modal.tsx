import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBuzzlok } from "@/context/buzzlok-context";
import { DiscoveryKind, PriceCategory } from "@/lib/buzzlok-data";
import { Cpu, ExternalLink, Globe, Send, Sparkles, Tag, Wand2, Zap } from "lucide-react";
import { autoEnrichSubmittedUrl } from "@/lib/engine";
import { toast } from "sonner";
import { AILoader } from "@/components/buzzlok/ai-loader";

const kindOptions: { label: string; kind: DiscoveryKind; tag: string; icon: string }[] = [
  { label: "Autonomous Agent", kind: "Agent", tag: "🤖 AGENT", icon: "🤖" },
  { label: "Coding Co-pilot", kind: "Coding", tag: "💻 CODING", icon: "💻" },
  { label: "Reasoning LLM", kind: "Reasoning", tag: "🧠 REASONING", icon: "🧠" },
  { label: "Generative Vision", kind: "Vision", tag: "🎨 VISION", icon: "🎨" },
  { label: "Voice / Audio AI", kind: "Audio", tag: "🎙️ AUDIO", icon: "🎙️" },
  { label: "Open Source Repo", kind: "OpenSource", tag: "🌐 OPEN SOURCE", icon: "🌐" },
  { label: "AI Tool & SaaS", kind: "Tool", tag: "⚡ AI TOOL", icon: "⚡" },
  { label: "AI Breakthrough", kind: "Breakthrough", tag: "🔥 SOTA", icon: "🚀" },
];

export function SubmitBuzzModal() {
  const { isSubmitModalOpen, setIsSubmitModalOpen, addDiscovery } = useBuzzlok();

  const [selectedKind, setSelectedKind] = useState<DiscoveryKind>("Agent");
  const [title, setTitle] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [modelBackbone, setModelBackbone] = useState("Claude 3.7 & GPT-4o");
  const [pricingCategory, setPricingCategory] = useState<PriceCategory>("Freemium");
  const [summary, setSummary] = useState("");
  const [what, setWhat] = useState("");
  const [tasks, setTasks] = useState("");
  const [isEnriching, setIsEnriching] = useState(false);

  const handleAutoFill = async () => {
    if (!websiteUrl.trim()) {
      toast.error("Please enter a website or GitHub URL first");
      return;
    }

    setIsEnriching(true);
    toast.info("Extracting and enriching AI metadata from URL...");

    try {
      const enriched = await autoEnrichSubmittedUrl(websiteUrl.trim());
      if (enriched.title) setTitle(enriched.title);
      if (enriched.summary) setSummary(enriched.summary);
      if (enriched.kind) setSelectedKind(enriched.kind);
      if (enriched.priceCategory) setPricingCategory(enriched.priceCategory);
      if (enriched.modelBackbone) setModelBackbone(enriched.modelBackbone);
      if (enriched.tasks && enriched.tasks.length > 0) setTasks(enriched.tasks.join(", "));
      if (enriched.details?.what) setWhat(enriched.details.what);

      toast.success("✨ Auto-fill complete!", {
        description: `Classified as ${enriched.kind} (${enriched.priceCategory}). Review and submit!`,
      });
    } catch (err) {
      toast.error("Could not auto-fill metadata. You can fill in the fields manually.");
    } finally {
      setIsEnriching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const opt = kindOptions.find((k) => k.kind === selectedKind) ?? kindOptions[0]!;

    const parsedTasks = tasks
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    addDiscovery({
      tag: opt.tag,
      icon: opt.icon,
      kind: selectedKind,
      title: title.trim(),
      summary: summary.trim(),
      place: modelBackbone.trim() || "Independent Developer",
      lanes: ["All AI Tools", "⚡ New Launches", "🔥 Trending Today"],
      interests: ["Autonomous Agents", "Code Generation", "Workflow Automation"],
      priceCategory: pricingCategory,
      modelBackbone: modelBackbone.trim(),
      websiteUrl: websiteUrl.trim().startsWith("http")
        ? websiteUrl.trim()
        : `https://${websiteUrl.trim()}`,
      tasks: parsedTasks.length > 0 ? parsedTasks : ["AI Automation", "Productivity"],
      details: {
        what: what.trim() || summary.trim(),
        why: "Community submission verified by Buzzlok AI intelligence listeners.",
        matters: "Indexed directly on the Buzzlok real-time AI discovery radar.",
        action: `Visit official portal at ${websiteUrl || "https://buzzlok.com"} to start testing.`,
        location: modelBackbone.trim() || "Cloud & API",
        timing: "Live Globally",
        price: `${pricingCategory} · Verified Pricing`,
        verified: true,
        websiteUrl: websiteUrl.trim(),
        modelBackbone: modelBackbone.trim(),
      },
    });

    // Reset form
    setTitle("");
    setWebsiteUrl("");
    setSummary("");
    setWhat("");
    setTasks("");
    setIsSubmitModalOpen(false);
  };

  return (
    <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto border-border/80 bg-card/95 p-6 backdrop-blur-2xl sm:rounded-3xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-buzz/40 bg-buzz/10 px-3 py-1 text-xs font-semibold text-buzz w-max">
            <Sparkles className="size-3.5" /> Submit an AI Tool
          </div>
          <DialogTitle className="font-display text-2xl font-bold">
            Add an AI Tool, Agent, or Model
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Built an autonomous agent, fine-tuned an open model, or launched an AI tool? Get it
            indexed on Buzzlok.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* AI Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2">
              AI Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {kindOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedKind(opt.kind)}
                  className={`rounded-xl border p-2 text-xs font-medium transition-all text-left truncate cursor-pointer ${
                    selectedKind === opt.kind
                      ? "border-buzz bg-buzz/15 text-buzz font-semibold shadow-sm"
                      : "border-border bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span className="mr-1">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
              Tool / Model Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cursor: AI Code Editor with multi-file composer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-input bg-secondary/50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-buzz"
            />
          </div>

          {/* Website / Repo URL */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Website or GitHub URL *
              </label>
              {websiteUrl.trim().length > 3 && (
                <button
                  type="button"
                  disabled={isEnriching}
                  onClick={handleAutoFill}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-buzz hover:underline cursor-pointer disabled:opacity-50"
                >
                  {isEnriching ? (
                    <>
                      <AILoader size="xs" variant="icon" /> Enriching...
                    </>
                  ) : (
                    <>
                      <Wand2 className="size-3" /> Auto-Fill with AI
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="relative">
              <Globe className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
              <input
                type="text"
                required
                placeholder="https://cursor.com or https://github.com/..."
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full rounded-xl border border-input bg-secondary/50 pl-10 pr-4 py-2.5 text-sm outline-none transition-colors focus:border-buzz"
              />
            </div>
          </div>

          {/* Model Backbone and Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Model Backbone / LLM
              </label>
              <input
                type="text"
                placeholder="e.g. Claude 3.7, DeepSeek-R1, Llama 3.3"
                value={modelBackbone}
                onChange={(e) => setModelBackbone(e.target.value)}
                className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-buzz"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Pricing Model *
              </label>
              <select
                value={pricingCategory}
                onChange={(e) => setPricingCategory(e.target.value as PriceCategory)}
                className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-buzz cursor-pointer"
              >
                <option value="Free">Free</option>
                <option value="Open Source">Open Source</option>
                <option value="Freemium">Freemium</option>
                <option value="Free Trial">Free Trial</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
              What task does this AI solve? (1-2 sentences) *
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Generates fullstack web applications from natural language prompts with live previews and database syncing."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-xl border border-input bg-secondary/50 px-4 py-2 text-sm outline-none transition-colors focus:border-buzz resize-none"
            />
          </div>

          {/* Tasks Tags */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
              Tasks / Capabilities (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Coding, Fullstack App, React, Supabase"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-buzz"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-buzz px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] cursor-pointer"
            >
              <Send className="size-3.5" /> Index AI Tool
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
