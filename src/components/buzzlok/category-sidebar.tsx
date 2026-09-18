import { useState } from "react";
import {
  Bookmark,
  Layers,
  Mail,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { categories } from "@/lib/buzzlok-data";
import { useBuzzlok } from "@/context/buzzlok-context";

export function CategorySidebar() {
  const {
    discoveries,
    activeCategory,
    setActiveCategory,
    savedIds,
    setIsSavedDrawerOpen,
    setIsSubmitModalOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    setSearchQuery,
  } = useBuzzlok();

  const [isHovered, setIsHovered] = useState(false);

  const handleCategorySelect = (kind?: string) => {
    setActiveCategory(kind || "All");
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
  // Full Expanded Sidebar Content (Rendered on Hover & Mobile)
  // -------------------------------------------------------------
  const fullContent = (
    <div className="flex h-full w-72 flex-col justify-between p-4 sm:p-5 overflow-y-auto scrollbar-thin">
      {/* Top Header & Brand */}
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <a href="#top" className="group flex items-center gap-2.5">
            <img
              src="/logo-dark.png"
              alt="Buzzlok"
              className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-buzz/20 text-buzz px-1.5 py-0.5 border border-buzz/30">
              AI
            </span>
          </a>

          {/* Mobile close button only */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden cursor-pointer"
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
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-sm shrink-0">{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors shrink-0 ${
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
          <span className="text-[10px] text-muted-foreground font-semibold">Free</span>
        </a>
      </div>
    </div>
  );

  // -------------------------------------------------------------
  // Slim Sidebar Content (Default View with Big Square Icons)
  // -------------------------------------------------------------
  const slimContent = (
    <div className="flex h-full w-20 flex-col justify-between items-center py-4 px-2">
      {/* Top: Big Square Logo icon + Big Square Submit */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Big Square Logo Icon */}
        <a
          href="#top"
          className="group relative grid size-13 place-items-center rounded-2xl border border-border/80 bg-secondary/70 p-2 shadow-sm transition-all duration-200 hover:scale-105 hover:border-buzz/50 hover:bg-buzz/10 cursor-pointer"
          title="Buzzlok AI · Discover More Around You"
        >
          <img
            src="/logo-icon.png"
            alt="Buzzlok"
            className="size-10 object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
          />
        </a>

        {/* Big Square Submit Tool Button */}
        <button
          type="button"
          onClick={() => setIsSubmitModalOpen(true)}
          className="grid size-12 place-items-center rounded-2xl bg-buzz text-primary-foreground shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
          title="Submit AI Tool +"
        >
          <Sparkles className="size-5" />
        </button>

        <div className="w-10 h-px bg-border/60 my-1" />

        {/* Big Square Category Icons Stack */}
        <div className="flex flex-col items-center gap-2 w-full">
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
                className={`group relative grid size-12 place-items-center rounded-2xl transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-buzz/20 text-buzz border-2 border-buzz/60 shadow-md scale-105 font-bold"
                    : "border border-border/60 bg-card/60 text-muted-foreground hover:border-buzz/40 hover:bg-secondary hover:text-foreground"
                }`}
                title={`${cat.label} (${count})`}
              >
                <span className="text-xl">{cat.icon}</span>

                {/* Active Indicator Dot */}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-buzz ring-2 ring-background" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Big Square Action Icons in Slim Mode */}
      <div className="flex flex-col items-center gap-2.5 pt-3 border-t border-border/60 w-full">
        {/* Big Square Saved Stack Icon */}
        <button
          type="button"
          onClick={() => setIsSavedDrawerOpen(true)}
          className="relative grid size-12 place-items-center rounded-2xl border border-border/70 bg-card/60 text-muted-foreground hover:bg-secondary hover:text-buzz hover:border-buzz/50 transition-all cursor-pointer"
          title={`My Saved Stack (${savedIds.length})`}
        >
          <Bookmark className={`size-5 ${savedIds.length > 0 ? "fill-buzz text-buzz" : ""}`} />
          {savedIds.length > 0 && (
            <span className="absolute -top-1 -right-1 grid size-4.5 place-items-center rounded-full bg-buzz text-[9px] font-bold text-primary-foreground">
              {savedIds.length}
            </span>
          )}
        </button>

        {/* Big Square Daily Digest Icon */}
        <a
          href="#daily"
          className="grid size-12 place-items-center rounded-2xl border border-border/60 bg-card/60 text-muted-foreground hover:bg-secondary hover:text-accent hover:border-accent/40 transition-colors cursor-pointer"
          title="Buzzlok Daily Digest"
        >
          <Mail className="size-5" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar Placeholder (Maintains layout width for big square icons) */}
      <div className="hidden lg:block w-20 shrink-0" />

      {/* Desktop Hover Auto-Expanding Sidebar */}
      <aside
        aria-label="Discovery Categories Navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col border-r border-border/70 bg-card/95 backdrop-blur-2xl shadow-xl transition-all duration-300 ease-out overflow-hidden ${
          isHovered ? "w-72 shadow-2xl ring-1 ring-buzz/20" : "w-20"
        }`}
      >
        {isHovered ? fullContent : slimContent}
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
