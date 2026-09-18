import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBuzzlok } from "@/context/buzzlok-context";
import {
  Bookmark,
  CheckCircle2,
  Compass,
  Flame,
  Sparkles,
  Tag,
  Timer,
  Zap,
} from "lucide-react";

export function ExploreModal() {
  const { selectedDiscovery, setSelectedDiscovery, toggleSave, isSaved } =
    useBuzzlok();

  if (!selectedDiscovery) return null;

  const saved = isSaved(selectedDiscovery.id);
  const details = selectedDiscovery.details;

  return (
    <Dialog open={!!selectedDiscovery} onOpenChange={(open) => !open && setSelectedDiscovery(null)}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border/80 bg-card/95 p-6 backdrop-blur-2xl sm:rounded-3xl">
        <DialogHeader className="space-y-3 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-buzz/40 bg-buzz/10 px-3 py-1 text-xs font-semibold text-buzz">
                {selectedDiscovery.tag}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2.5 py-1 text-xs text-muted-foreground">
                <Flame className="size-3.5 text-accent" />
                Heat {selectedDiscovery.heat}
              </span>
            </div>
            {details?.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-live">
                <CheckCircle2 className="size-3.5" /> Verified Discovery
              </span>
            )}
          </div>

          <DialogTitle className="font-display text-2xl font-bold leading-tight sm:text-3xl">
            {selectedDiscovery.title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
            {selectedDiscovery.summary}
          </DialogDescription>
        </DialogHeader>

        {/* 60-second summary structured card */}
        <div className="mt-4 rounded-2xl border border-border/60 bg-secondary/30 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-buzz">
            <Timer className="size-4" /> 60-Second Intelligence Breakdown
          </div>

          <div className="grid gap-3 text-sm">
            <div className="border-l-2 border-buzz/60 pl-3.5">
              <p className="text-xs font-bold uppercase text-buzz/90">What is it?</p>
              <p className="mt-0.5 text-muted-foreground">
                {details?.what || selectedDiscovery.summary}
              </p>
            </div>

            <div className="border-l-2 border-accent/60 pl-3.5">
              <p className="text-xs font-bold uppercase text-accent/90">Why is it buzzworthy?</p>
              <p className="mt-0.5 text-muted-foreground">
                {details?.why ||
                  "High local engagement and strong positive word-of-mouth verification."}
              </p>
            </div>

            <div className="border-l-2 border-buzz/40 pl-3.5">
              <p className="text-xs font-bold uppercase text-buzz/80">Why does it matter?</p>
              <p className="mt-0.5 text-muted-foreground">
                {details?.matters ||
                  "Curated directly by the Buzzlok discovery intelligence engine."}
              </p>
            </div>

            <div className="border-l-2 border-live/60 pl-3.5">
              <p className="text-xs font-bold uppercase text-live">What can you do?</p>
              <p className="mt-0.5 text-muted-foreground font-medium text-foreground/90">
                {details?.action || "Visit in person or check online booking passes."}
              </p>
            </div>
          </div>
        </div>

        {/* Meta info pills */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card/60 p-3">
            <Sparkles className="size-4 shrink-0 text-buzz" />
            <div>
              <span className="block text-muted-foreground">Ecosystem / Platform</span>
              <span className="font-medium text-foreground">{selectedDiscovery.place}</span>
            </div>
          </div>

          {selectedDiscovery.modelBackbone && (
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card/60 p-3">
              <Zap className="size-4 shrink-0 text-accent" />
              <div>
                <span className="block text-muted-foreground">Model Architecture</span>
                <span className="font-medium text-foreground">
                  {selectedDiscovery.modelBackbone}
                </span>
              </div>
            </div>
          )}

          {details?.price && (
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card/60 p-3">
              <Tag className="size-4 shrink-0 text-live" />
              <div>
                <span className="block text-muted-foreground">Pricing & Tiers</span>
                <span className="font-medium text-foreground">{details.price}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card/60 p-3">
            <Compass className="size-4 shrink-0 text-buzz" />
            <div>
              <span className="block text-muted-foreground">AI Discovery Lanes</span>
              <span className="font-medium text-foreground">
                {selectedDiscovery.lanes.join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleSave(selectedDiscovery.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                saved
                  ? "bg-buzz/20 text-buzz border border-buzz/40"
                  : "border border-border bg-secondary hover:bg-buzz/10 hover:text-buzz"
              }`}
            >
              <Bookmark className={`size-4 ${saved ? "fill-current" : ""}`} />
              {saved ? "Saved in My Stack" : "Save to Stack"}
            </button>
          </div>

          {selectedDiscovery.websiteUrl && (
            <a
              href={selectedDiscovery.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-buzz px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 shadow-sm cursor-pointer"
            >
              <span>Launch & Try AI</span>
              <Zap className="size-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
