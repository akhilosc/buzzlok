import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Layers,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Tag,
  X,
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
    isSidebarCollapsed,
    setIsSidebarCollapsed,
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

  // -------------------------------------------------------------
  // Full Expanded Sidebar Content (Used in expanded mode & mobile)
  // -------------------------------------------------------------
  const fullContent = (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5">
      {/* Top Header & Brand */}
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
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

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(true)}
              className="hidden lg:grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
              title="Collapse to slim sidebar"
            >
              <PanelLeftClose className="size-4" />
            </button>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden cursor-pointer"
              title="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>
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

          <div className="mt-2 space-y-0.5 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
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
            <span>Saved Stack</span>
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

        {/* Collapse button at bottom */}
        <button
          type="button"
          onClick={() => setIsSidebarCollapsed(true)}
          className="hidden lg:flex w-full items-center justify-center gap-1.5 rounded-xl border border-border/70 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-3.5" />
          <span>Collapse Menu</span>
        </button>
      </div>
    </div>
  );

  // -------------------------------------------------------------
  // Slim Sidebar Content (Icon-only with Expand Trigger)
  // -------------------------------------------------------------
  const slimContent = (
    <div className="flex h-full flex-col justify-between items-center py-4 px-2">
      {/* Top: Logo icon + Expand trigger */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Logo Icon */}
        <a
          href="#top"
          className="group relative grid size-10 place-items-center rounded-2xl p-1 transition-transform duration-200 hover:scale-110 cursor-pointer"
          title="Buzzlok AI · Discover More Around You"
        >
          <img
            src="/logo-icon.png"
            alt="Buzzlok"
            className="size-9 object-contain drop-shadow-sm"
          />
        </a>

        {/* Expand Sidebar Toggle */}
        <button
          type="button"
          onClick={() => setIsSidebarCollapsed(false)}
          className="grid size-9 place-items-center rounded-xl border border-border/70 bg-secondary/60 text-muted-foreground hover:border-buzz/50 hover:bg-buzz/10 hover:text-buzz transition-all cursor-pointer group"
          title="Expand menu"
        >
          <PanelLeftOpen className="size-4 transition-transform group-hover:scale-110" />
        </button>

        {/* Submit Tool Icon Button */}
        <button
          type="button"
          onClick={() => setIsSubmitModalOpen(true)}
          className="grid size-10 place-items-center rounded-xl bg-buzz text-primary-foreground shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="Submit AI Tool +"
        >
          <Sparkles className="size-4" />
        </button>

        <div className="w-8 h-px bg-border/60 my-1" />

        {/* Category Icons Stack */}
        <div className="flex flex-col items-center gap-1.5 w-full">
          {categories.map((cat) => {
            const isSelected = (cat.kind || "All").toLowerCase() === activeCategory.toLowerCase();
            const count =
              cat.kind === undefined
                ? discoveries.length
                : discoveries.filter((d) => d.kind.toLowerCase() === cat.kind?.toLowerCase()).length;

            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => handleCategorySelect(cat.kind)}
                className={`group relative grid size-10 place-items-center rounded-xl transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-buzz/20 text-buzz border border-buzz/40 shadow-xs scale-105"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                title={`${cat.label} (${count})`}
              >
                <span className="text-base">{cat.icon}</span>

                {/* Active Indicator Dot */}
                {isSelected && (
                  <span className="absolute -right-0.5 top-1.5 size-1.5 rounded-full bg-buzz" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Icons in Slim Mode */}
      <div className="flex flex-col items-center gap-2 pt-3 border-t border-border/60 w-full">
        {/* Saved Stack Icon */}
        <button
          type="button"
          onClick={() => setIsSavedDrawerOpen(true)}
          className="relative grid size-10 place-items-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground hover:bg-secondary hover:text-buzz transition-all cursor-pointer"
          title={`My Saved Stack (${savedIds.length})`}
        >
          <Bookmark className={`size-4 ${savedIds.length > 0 ? "fill-buzz text-buzz" : ""}`} />
          {savedIds.length > 0 && (
            <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-buzz text-[9px] font-bold text-primary-foreground">
              {savedIds.length}
            </span>
          )}
        </button>

        {/* Daily Digest Icon */}
        <a
          href="#daily"
          className="grid size-9 place-items-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-accent transition-colors cursor-pointer"
          title="Buzzlok Daily Digest"
        >
          <Mail className="size-4" />
        </a>

        {/* Expand Arrow Button */}
        <button
          type="button"
          onClick={() => setIsSidebarCollapsed(false)}
          className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
          title="Expand menu"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (Slim by default with smooth expand) */}
      <aside
        aria-label="Discovery Categories Navigation"
        className={`hidden lg:flex shrink-0 flex-col border-r border-border/70 bg-card/40 backdrop-blur-xl h-screen sticky top-0 overflow-y-auto scrollbar-thin z-30 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-16" : "w-64 xl:w-72"
        }`}
      >
        {isSidebarCollapsed ? slimContent : fullContent}
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
            {fullContent}
          </aside>
        </div>
      )}
    </>
  );
}
