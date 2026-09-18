import { useMemo, useState } from "react";
import {
  ArrowUp,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  ExternalLink,
  Flame,
  Home,
  LayoutGrid,
  List,
  Loader2,
  MapPin,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  X,
  Zap,
} from "lucide-react";
import { categories, Discovery, neighborhoods } from "@/lib/buzzlok-data";
import { useBuzzlok } from "@/context/buzzlok-context";
import { rankAndFilterDiscoveries } from "@/lib/engine";

type PriceFilter = "All" | "Free" | "Open Source" | "Freemium" | "Paid";

export function DiscoveryFeed() {
  const {
    discoveries,
    activeLane,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedArea,
    setSelectedArea,
    selectedInterests,
    isSaved,
    toggleSave,
    upvotedIds,
    toggleUpvote,
    getUpvotes,
    setSelectedDiscovery,
    setIsSubmitModalOpen,
    isSyncingRadar,
    syncLiveRadar,
  } = useBuzzlok();

  const [sortBy, setSortBy] = useState<"upvotes" | "latest" | "price">("upvotes");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("All");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  // Filtered & Ranked discoveries using the dynamic engine
  const filtered = useMemo(() => {
    let ranked = rankAndFilterDiscoveries(discoveries, {
      query: searchQuery,
      lane: activeLane,
      category: activeCategory,
      area: selectedArea,
    });

    if (priceFilter !== "All") {
      ranked = ranked.filter((d) => d.priceCategory === priceFilter);
    }

    return ranked;
  }, [discoveries, activeLane, activeCategory, selectedArea, priceFilter, searchQuery]);

  // Sorted discoveries
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "upvotes") return getUpvotes(b) - getUpvotes(a);
      if (sortBy === "latest") {
        return a.age.includes("sec") || a.age === "Just now"
          ? -1
          : b.age.includes("sec") || b.age === "Just now"
            ? 1
            : a.age.includes("min") && !b.age.includes("min")
              ? -1
              : 0;
      }
      if (sortBy === "price") {
        const score = (d: Discovery) =>
          d.priceCategory === "Free" || d.priceCategory === "Open Source"
            ? 0
            : d.priceCategory === "Freemium"
              ? 1
              : 2;
        return score(a) - score(b);
      }
      return 0;
    });
  }, [filtered, sortBy, getUpvotes]);

  // Top 2 featured buzzes (if viewing All categories and no search query)
  const featured = useMemo(() => {
    if (
      searchQuery ||
      activeCategory !== "All" ||
      selectedArea !== "All Ecosystems" ||
      priceFilter !== "All" ||
      activeLane !== "All AI Tools"
    ) {
      return [];
    }
    return sorted.filter((d) => d.heat >= 88).slice(0, 2);
  }, [sorted, searchQuery, activeCategory, selectedArea, priceFilter, activeLane]);

  // Remaining list items
  const directoryList = useMemo(() => {
    if (featured.length === 0) return sorted;
    const featuredIds = new Set(featured.map((f) => f.id));
    return sorted.filter((d) => !featuredIds.has(d.id));
  }, [sorted, featured]);

  return (
    <section id="feed" className="w-full px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
      <div className="w-full space-y-6">
        {/* Directory Controls Bar */}
        <div className="border-b border-border/60 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-buzz/15 px-2.5 py-0.5 text-[11px] font-bold text-buzz">
                  <Flame className="size-3 fill-buzz" />
                  AI DIRECTORY
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Showing {sorted.length} of {discoveries.length} verified AI models & tools
                </span>
              </div>
              <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight">
                Find the Best AI Tools & Agents by Task
              </h2>
            </div>

            {/* Quick Actions & View Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-xl border border-border bg-card/70 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Card view"
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-buzz text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("compact")}
                  title="Compact list view"
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewMode === "compact"
                      ? "bg-buzz text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="size-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={isSyncingRadar}
                onClick={() => syncLiveRadar(false)}
                title="Fetch live AI releases from GitHub, Hugging Face, and Product feeds"
                className="inline-flex items-center gap-1.5 rounded-xl border border-buzz/40 bg-buzz/10 px-3.5 py-2 text-xs font-semibold text-buzz transition-all hover:bg-buzz/20 cursor-pointer disabled:opacity-50"
              >
                {isSyncingRadar ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" /> Ingesting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-3.5" /> Sync Live Radar
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-buzz px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="size-3.5" /> Submit AI Tool +
              </button>
            </div>
          </div>

          {/* Category Tabs with Item Counts */}
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {/* All AI / Home Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                activeCategory.toLowerCase() === "all" && !searchQuery
                  ? "border-buzz bg-buzz text-primary-foreground shadow-xs scale-100"
                  : "border-border/70 bg-card/60 text-muted-foreground hover:border-buzz/40 hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Home className="size-3.5" />
              <span>All AI</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  activeCategory.toLowerCase() === "all" && !searchQuery ? "bg-black/25 text-white" : "bg-secondary text-muted-foreground"
                }`}
              >
                {discoveries.length}
              </span>
            </button>

            {categories.map((cat) => {
              const count =
                cat.kind === undefined
                  ? discoveries.length
                  : discoveries.filter((d) => d.kind.toLowerCase() === cat.kind?.toLowerCase())
                      .length;
              const isSelected =
                activeCategory.toLowerCase() !== "all" &&
                (cat.kind || "").toLowerCase() === activeCategory.toLowerCase();

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setActiveCategory(cat.kind || "All")}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "border-buzz bg-buzz text-primary-foreground shadow-xs scale-100"
                      : "border-border/70 bg-card/60 text-muted-foreground hover:border-buzz/40 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {cat.iconUrl ? (
                      <img
                        src={cat.iconUrl}
                        alt={cat.label}
                        className="size-4 object-contain shrink-0"
                      />
                    ) : (
                      <span>{cat.icon}</span>
                    )}
                    <span>{cat.label}</span>
                  </span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isSelected ? "bg-black/25 text-white" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Controls Bar: Filters & Sorting */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Left: Ecosystem Filter + Price filter */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/70 px-3 py-1.5">
                <MapPin className="size-3.5 text-buzz" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="bg-transparent font-medium text-foreground outline-none cursor-pointer"
                >
                  {neighborhoods.map((n) => (
                    <option key={n} value={n} className="bg-card text-foreground">
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter Chips */}
              <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-card/70 p-0.5">
                {(["All", "Free", "Open Source", "Freemium", "Paid"] as PriceFilter[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriceFilter(p)}
                    className={`rounded-lg px-2 py-0.5 font-medium transition-all ${
                      priceFilter === p
                        ? "bg-buzz/15 text-buzz font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Sort controls */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-medium">
                <SlidersHorizontal className="size-3 text-buzz" />
                Sort:
              </span>
              <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-card/70 p-0.5">
                <button
                  type="button"
                  onClick={() => setSortBy("upvotes")}
                  className={`rounded-lg px-2 py-0.5 font-medium transition-all ${
                    sortBy === "upvotes"
                      ? "bg-buzz text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ▲ Upvotes
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("latest")}
                  className={`rounded-lg px-2 py-0.5 font-medium transition-all ${
                    sortBy === "latest"
                      ? "bg-buzz text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ⚡ Latest
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("price")}
                  className={`rounded-lg px-2 py-0.5 font-medium transition-all ${
                    sortBy === "price"
                      ? "bg-buzz text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🏷️ Deals
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active search filter badge */}
        {searchQuery && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-buzz/40 bg-buzz/10 px-3.5 py-2 text-xs text-buzz">
            <Search className="size-3.5 shrink-0" />
            <span className="truncate">
              Filtering by: <strong className="font-bold underline">"{searchQuery}"</strong> (
              {sorted.length} spots matched)
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="ml-auto inline-flex items-center gap-1 rounded-lg bg-buzz/20 px-2 py-0.5 font-semibold text-[11px] hover:bg-buzz/30"
              title="Clear search"
            >
              Clear <X className="size-3" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {sorted.length === 0 ? (
          <div className="glass-panel my-12 rounded-3xl p-10 text-center space-y-3 border-dashed border-border/80">
            <Compass className="mx-auto size-12 text-muted-foreground/30 stroke-1" />
            <h3 className="text-base font-bold">No spots or buzzes match your criteria</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              We couldn't find any listings for this filter combination. Try clearing your query or
              switching neighborhoods.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setSelectedArea("All Areas");
                  setPriceFilter("All");
                }}
                className="rounded-xl bg-buzz px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:scale-105 transition-transform"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-6">
            {/* Featured Section (TAAFT style) */}
            {featured.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-md bg-accent/20 px-2 py-0.5 text-[10px] font-black tracking-wider text-accent uppercase">
                    ⭐ FEATURED TODAY
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Highest community signal in Bangalore
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {featured.map((d) => (
                    <TaaftCard
                      key={`feat-${d.id}`}
                      discovery={d}
                      upvotes={getUpvotes(d)}
                      isUpvoted={upvotedIds.includes(d.id)}
                      isSaved={isSaved(d.id)}
                      onToggleUpvote={() => toggleUpvote(d.id)}
                      onToggleSave={() => toggleSave(d.id)}
                      onExplore={() => setSelectedDiscovery(d)}
                      isFeatured
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Main Directory Stream */}
            <div>
              {featured.length > 0 && (
                <div className="flex items-center gap-2 mb-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    All Discoveries ({directoryList.length})
                  </span>
                  <div className="h-px flex-1 bg-border/60" />
                </div>
              )}

              {viewMode === "grid" ? (
                /* Card Grid */
                <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {directoryList.map((d) => (
                    <TaaftCard
                      key={d.id}
                      discovery={d}
                      upvotes={getUpvotes(d)}
                      isUpvoted={upvotedIds.includes(d.id)}
                      isSaved={isSaved(d.id)}
                      onToggleUpvote={() => toggleUpvote(d.id)}
                      onToggleSave={() => toggleSave(d.id)}
                      onExplore={() => setSelectedDiscovery(d)}
                    />
                  ))}
                </div>
              ) : (
                /* Compact Directory List */
                <div className="space-y-2">
                  {directoryList.map((d) => (
                    <TaaftRow
                      key={d.id}
                      discovery={d}
                      upvotes={getUpvotes(d)}
                      isUpvoted={upvotedIds.includes(d.id)}
                      isSaved={isSaved(d.id)}
                      onToggleUpvote={() => toggleUpvote(d.id)}
                      onToggleSave={() => toggleSave(d.id)}
                      onExplore={() => setSelectedDiscovery(d)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// TAAFT-Style Directory Card
// -------------------------------------------------------------
function TaaftCard({
  discovery,
  upvotes,
  isUpvoted,
  isSaved,
  onToggleUpvote,
  onToggleSave,
  onExplore,
  isFeatured = false,
}: {
  discovery: Discovery;
  upvotes: number;
  isUpvoted: boolean;
  isSaved: boolean;
  onToggleUpvote: () => void;
  onToggleSave: () => void;
  onExplore: () => void;
  isFeatured?: boolean;
}) {
  const priceClass =
    discovery.priceCategory === "Open Source" || discovery.priceCategory === "Free"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
      : discovery.priceCategory === "Freemium" || discovery.priceCategory === "Free Trial"
        ? "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold"
        : "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold";

  return (
    <article
      aria-label={`${discovery.title} on ${discovery.place}`}
      className={`group glass-panel relative flex flex-col justify-between rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isFeatured
          ? "border-accent/40 bg-gradient-to-b from-accent/5 to-card/60 shadow-md ring-1 ring-accent/30"
          : "border-border/70 hover:border-buzz/50"
      }`}
    >
      <div>
        {/* Top Header Row: Upvote + Icon + Meta */}
        <div className="flex items-start gap-3">
          {/* Vertical Upvote Box (TAAFT Style) */}
          <button
            type="button"
            onClick={onToggleUpvote}
            aria-label={`Upvote ${discovery.title}. Current count: ${upvotes}`}
            title={isUpvoted ? "Remove upvote" : "Upvote this AI tool"}
            className={`flex shrink-0 flex-col items-center justify-center rounded-xl border px-2.5 py-2 transition-all duration-200 active:scale-95 cursor-pointer ${
              isUpvoted
                ? "border-buzz bg-buzz text-primary-foreground shadow-xs font-bold"
                : "border-border/80 bg-secondary/80 text-foreground hover:border-buzz/40 hover:bg-buzz/10 hover:text-buzz"
            }`}
          >
            <ArrowUp
              aria-hidden="true"
              className={`size-4 transition-transform group-hover:-translate-y-0.5 ${
                isUpvoted ? "stroke-[3]" : "stroke-[2]"
              }`}
            />
            <span className="mt-0.5 text-xs font-bold">{upvotes}</span>
          </button>

          {/* Icon Thumbnail */}
          <div
            role="img"
            aria-label={`${discovery.title} category icon`}
            className="grid size-11 shrink-0 place-items-center rounded-xl border border-border/80 bg-secondary/90 text-2xl shadow-inner group-hover:scale-105 transition-transform"
          >
            {discovery.icon}
          </div>

          {/* Title and Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-md border border-buzz/30 bg-buzz/10 px-2 py-0.5 text-[10px] font-bold text-buzz">
                {discovery.tag}
              </span>
              <span className={`rounded-md border px-1.5 py-0.5 text-[10px] ${priceClass}`}>
                {discovery.priceCategory}
              </span>
              {discovery.modelBackbone && (
                <span className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                  ⚡ {discovery.modelBackbone}
                </span>
              )}
              {discovery.details?.verified && (
                <span
                  title="Verified AI Tool"
                  aria-label="Verified tool"
                  className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-500"
                >
                  <CheckCircle2 className="size-3 fill-emerald-500/20" />
                </span>
              )}
            </div>

            <h3
              onClick={onExplore}
              className="mt-1.5 font-display text-sm sm:text-base font-bold text-foreground group-hover:text-buzz transition-colors cursor-pointer leading-snug line-clamp-2"
            >
              {discovery.title}
            </h3>
          </div>
        </div>

        {/* Summary Description */}
        <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {discovery.summary}
        </p>

        {/* Task Tags */}
        {discovery.tasks && discovery.tasks.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {discovery.tasks.slice(0, 3).map((task) => (
              <span
                key={task}
                className="rounded-md bg-secondary/70 border border-border/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground"
              >
                {task}
              </span>
            ))}
          </div>
        )}

        {/* Ecosystem & Age */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 truncate font-medium text-foreground/80">
            <Sparkles className="size-3 text-accent shrink-0" aria-hidden="true" />
            <span className="truncate">{discovery.place}</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0 text-muted-foreground/80">
            <Clock className="size-3" aria-hidden="true" />
            {discovery.age}
          </span>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-border/50 pt-3">
        {/* Upvote Pill Button */}
        <button
          type="button"
          onClick={onToggleUpvote}
          aria-label={
            isUpvoted
              ? `Remove upvote for ${discovery.title}. Currently ${upvotes} upvotes.`
              : `Upvote ${discovery.title}. Currently ${upvotes} upvotes.`
          }
          className={`group/btn inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
            isUpvoted
              ? "border-live bg-live/15 text-live shadow-xs scale-102"
              : "border-border/80 bg-secondary/80 text-foreground hover:border-buzz hover:bg-buzz/10 hover:text-buzz"
          }`}
          title={isUpvoted ? "Upvoted" : "Upvote this tool"}
        >
          <ArrowUp
            className={`size-3.5 transition-transform group-hover/btn:-translate-y-0.5 ${
              isUpvoted ? "stroke-[3]" : ""
            }`}
            aria-hidden="true"
          />
          <span>{upvotes}</span>
        </button>

        <div className="flex items-center gap-1.5">
          {discovery.websiteUrl && (
            <a
              href={discovery.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Launch official site for ${discovery.title}`}
              className="inline-flex items-center gap-1 rounded-xl bg-buzz px-3 py-1.5 font-bold text-primary-foreground text-xs hover:scale-105 active:scale-95 transition-transform"
              title="Try AI / Visit Website"
            >
              <span>Try AI</span>
              <ExternalLink className="size-3" />
            </a>
          )}

          <button
            type="button"
            onClick={onToggleSave}
            aria-label={
              isSaved
                ? `Remove ${discovery.title} from saved tools`
                : `Save ${discovery.title} to your stack`
            }
            className={`inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 font-semibold transition-all cursor-pointer ${
              isSaved
                ? "border-buzz bg-buzz text-primary-foreground"
                : "border-border/80 bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
            title={isSaved ? "Saved in collection" : "Save this AI"}
          >
            <Bookmark className={`size-3.5 ${isSaved ? "fill-current" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

// -------------------------------------------------------------
// TAAFT-Style Directory Row (List View)
// -------------------------------------------------------------
function TaaftRow({
  discovery,
  upvotes,
  isUpvoted,
  isSaved,
  onToggleUpvote,
  onToggleSave,
  onExplore,
}: {
  discovery: Discovery;
  upvotes: number;
  isUpvoted: boolean;
  isSaved: boolean;
  onToggleUpvote: () => void;
  onToggleSave: () => void;
  onExplore: () => void;
}) {
  const priceClass =
    discovery.priceCategory === "Open Source" || discovery.priceCategory === "Free"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
      : discovery.priceCategory === "Freemium" || discovery.priceCategory === "Free Trial"
        ? "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold"
        : "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold";

  return (
    <article
      aria-label={`${discovery.title} on ${discovery.place}`}
      className="group glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-3.5 transition-all hover:border-buzz/50 hover:bg-secondary/30"
    >
      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
        {/* Upvote Button */}
        <button
          type="button"
          onClick={onToggleUpvote}
          aria-label={`Upvote ${discovery.title}. Current count: ${upvotes}`}
          className={`flex shrink-0 flex-col items-center justify-center rounded-xl border px-2.5 py-1.5 transition-all cursor-pointer ${
            isUpvoted
              ? "border-buzz bg-buzz text-primary-foreground font-bold"
              : "border-border/80 bg-secondary/80 text-foreground hover:border-buzz/40 hover:bg-buzz/10 hover:text-buzz"
          }`}
        >
          <ArrowUp className="size-3.5" aria-hidden="true" />
          <span className="text-[11px] font-bold">{upvotes}</span>
        </button>

        {/* Icon */}
        <div
          role="img"
          aria-label={`${discovery.title} category icon`}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/80 bg-secondary/90 text-xl"
        >
          {discovery.icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-buzz/10 px-1.5 py-0.5 text-[10px] font-bold text-buzz">
              {discovery.tag}
            </span>
            <span className={`rounded-md border px-1.5 py-0.5 text-[10px] ${priceClass}`}>
              {discovery.priceCategory}
            </span>
            {discovery.modelBackbone && (
              <span className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                ⚡ {discovery.modelBackbone}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground truncate">⚡ {discovery.place}</span>
            <span className="text-[11px] text-muted-foreground">· {discovery.age}</span>
          </div>

          <h3
            onClick={onExplore}
            className="mt-0.5 font-display text-sm font-bold text-foreground group-hover:text-buzz transition-colors truncate cursor-pointer"
          >
            {discovery.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{discovery.summary}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
        <button
          type="button"
          onClick={onExplore}
          aria-label={`Read breakdown for ${discovery.title}`}
          className="rounded-xl bg-buzz/15 px-3 py-1.5 text-xs font-bold text-buzz hover:bg-buzz hover:text-primary-foreground transition-all cursor-pointer"
        >
          Breakdown
        </button>

        {discovery.websiteUrl && (
          <a
            href={discovery.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Try ${discovery.title}`}
            className="inline-flex items-center gap-1 rounded-xl bg-buzz px-2.5 py-1.5 text-xs font-bold text-primary-foreground hover:scale-105 active:scale-95 transition-transform"
          >
            <span>Try AI</span>
            <ExternalLink className="size-3" />
          </a>
        )}

        <button
          type="button"
          onClick={onToggleSave}
          aria-label={
            isSaved
              ? `Remove ${discovery.title} from saved tools`
              : `Save ${discovery.title} to your stack`
          }
          className={`grid size-8 place-items-center rounded-xl border transition-colors cursor-pointer ${
            isSaved
              ? "border-buzz bg-buzz text-primary-foreground"
              : "border-border/80 bg-secondary/80 text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bookmark className={`size-3.5 ${isSaved ? "fill-current" : ""}`} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
