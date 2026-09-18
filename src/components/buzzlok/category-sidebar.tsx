import {
  Bookmark,
  Building2,
  CheckCircle2,
  ChevronRight,
  Flame,
  Layers,
  Mail,
  MapPin,
  Search,
  Sparkles,
  Tag,
  X,
  Zap,
} from "lucide-react";
import { categories, neighborhoods } from "@/lib/buzzlok-data";
import { useBuzzlok } from "@/context/buzzlok-context";

export function CategorySidebar() {
  const {
    discoveries,
    activeCategory,
    setActiveCategory,
    selectedArea,
    setSelectedArea,
    savedIds,
    setIsSavedDrawerOpen,
    setIsSubmitModalOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    setSearchQuery,
  } = useBuzzlok();

  const handleCategorySelect = (kind?: string) => {
    setActiveCategory(kind || "All");
    setIsSidebarOpen(false);
    const feed = document.getElementById("feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    setIsSidebarOpen(false);
    const feed = document.getElementById("feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePriceClick = (term: string) => {
    setSearchQuery(term);
    setIsSidebarOpen(false);
    const feed = document.getElementById("feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5">
      {/* Top Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative grid size-8 place-items-center rounded-xl bg-buzz text-primary-foreground shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Zap className="size-4" strokeWidth={2.5} />
              <span className="absolute inset-0 rounded-xl border border-buzz animate-ping-ring" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Buzz<span className="text-buzz">lok</span>
              <span className="ml-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-buzz/20 text-buzz px-1.5 py-0.5 border border-buzz/30">
                AI
              </span>
            </span>
          </a>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
            title="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Action Button: Submit AI Tool */}
        <button
          type="button"
          onClick={() => {
            setIsSubmitModalOpen(true);
            setIsSidebarOpen(false);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-buzz px-3.5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Sparkles className="size-3.5" /> Submit AI Tool +
        </button>

        {/* Categories Section */}
        <div>
          <div className="flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Layers className="size-3 text-buzz" />
              AI Categories
            </span>
            <span className="rounded-full bg-secondary/80 px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
              {discoveries.length}
            </span>
          </div>

          <div className="mt-2 space-y-1">
            {categories.map((cat) => {
              const count =
                cat.kind === undefined
                  ? discoveries.length
                  : discoveries.filter((d) => d.kind.toLowerCase() === cat.kind?.toLowerCase())
                      .length;
              const isSelected = (cat.kind || "All").toLowerCase() === activeCategory.toLowerCase();

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => handleCategorySelect(cat.kind)}
                  className={`group flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-buzz/15 text-buzz font-bold shadow-xs border border-buzz/30"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                      isSelected
                        ? "bg-buzz text-primary-foreground"
                        : "bg-secondary text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Ecosystems Section */}
        <div>
          <div className="flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3 text-accent" />
              Ecosystems & Models
            </span>
          </div>

          <div className="mt-2 space-y-0.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            {neighborhoods.map((n) => {
              const isSelected = selectedArea === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => handleAreaSelect(n)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-accent/15 text-accent font-bold"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  <span className="truncate">{n}</span>
                  {isSelected && <span className="size-1.5 rounded-full bg-accent" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Model Shortcuts */}
        <div>
          <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Tag className="size-3 text-buzz" />
              Filter by Pricing
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5 px-1">
            {[
              { label: "All", term: "" },
              { label: "Free", term: "Free" },
              { label: "Open Source", term: "Open Source" },
              { label: "Freemium", term: "Freemium" },
              { label: "Paid", term: "Paid" },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handlePriceClick(p.term)}
                className="rounded-lg border border-border/80 bg-secondary/50 px-2 py-1 text-[11px] font-medium text-muted-foreground transition-all hover:border-buzz/40 hover:bg-buzz/10 hover:text-buzz cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="mt-6 border-t border-border/60 pt-4 space-y-2">
        {/* Saved Discoveries trigger */}
        <button
          type="button"
          onClick={() => {
            setIsSavedDrawerOpen(true);
            setIsSidebarOpen(false);
          }}
          className="flex w-full items-center justify-between rounded-xl border border-border/80 bg-card/60 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:text-buzz cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Bookmark className={`size-3.5 ${savedIds.length > 0 ? "fill-buzz text-buzz" : ""}`} />
            <span>Saved Spots</span>
          </span>
          <span className="grid size-5 place-items-center rounded-full bg-buzz text-[10px] font-bold text-primary-foreground">
            {savedIds.length}
          </span>
        </button>

        {/* Daily Digest link */}
        <a
          href="#daily"
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Mail className="size-3.5 text-accent" />
            <span>Buzzlok Daily</span>
          </span>
          <ChevronRight className="size-3 text-muted-foreground" />
        </a>

        {/* Status text */}
        <div className="px-2 pt-1 text-[11px] text-muted-foreground/70">
          <span>Bangalore · Real-time discovery</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        aria-label="Discovery Categories and Neighborhoods"
        className="hidden lg:flex w-64 xl:w-72 shrink-0 flex-col border-r border-border/70 bg-card/40 backdrop-blur-xl h-screen sticky top-0 overflow-y-auto scrollbar-thin z-30"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Category Menu"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <aside
            aria-label="Mobile Categories Navigation"
            className="fixed inset-y-0 left-0 w-72 sm:w-80 bg-card shadow-2xl border-r border-border overflow-y-auto scrollbar-thin z-50 animate-in slide-in-from-left duration-300"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
