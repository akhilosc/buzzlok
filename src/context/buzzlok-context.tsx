import React, { createContext, useContext, useState } from "react";
import { Discovery, initialDiscoveries } from "@/lib/buzzlok-data";
import { runFullIngestionPipeline } from "@/lib/engine";
import { toast } from "sonner";

interface BuzzlokContextType {
  discoveries: Discovery[];
  savedIds: string[];
  upvotedIds: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeLane: string;
  setActiveLane: (lane: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedDiscovery: Discovery | null;
  setSelectedDiscovery: (d: Discovery | null) => void;
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  isClaimModalOpen: boolean;
  setIsClaimModalOpen: (open: boolean) => void;
  isSavedDrawerOpen: boolean;
  setIsSavedDrawerOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  toggleUpvote: (id: string) => void;
  getUpvotes: (discovery: Discovery) => number;
  addDiscovery: (discovery: Omit<Discovery, "id" | "age" | "heat">) => void;
  shareDiscovery: (discovery: Discovery) => void;
  isSyncingRadar: boolean;
  syncLiveRadar: () => Promise<void>;
}

const BuzzlokContext = createContext<BuzzlokContextType | undefined>(undefined);

export function BuzzlokProvider({ children }: { children: React.ReactNode }) {
  const [discoveries, setDiscoveries] = useState<Discovery[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("buzzlok_discoveries");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return initialDiscoveries;
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("buzzlok_saved_ids");
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return ["d1", "d3"];
  });

  const [upvotedIds, setUpvotedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("buzzlok_upvoted_ids");
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return ["d1", "d2", "d11"];
  });

  const [upvoteDeltas, setUpvoteDeltas] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLane, setActiveLane] = useState<string>("All AI Tools");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedArea, setSelectedArea] = useState<string>("All Ecosystems");
  const [selectedDiscovery, setSelectedDiscovery] = useState<Discovery | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Autonomous Agents",
    "Code Generation",
    "LLM Reasoning",
  ]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Now");

  // Sync to localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("buzzlok_saved_ids", JSON.stringify(savedIds));
      } catch {}
    }
  }, [savedIds]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("buzzlok_upvoted_ids", JSON.stringify(upvotedIds));
      } catch {}
    }
  }, [upvotedIds]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("buzzlok_discoveries", JSON.stringify(discoveries));
      } catch {}
    }
  }, [discoveries]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        toast.info("Removed from your saved list");
        return prev.filter((x) => x !== id);
      } else {
        toast.success("Saved to your discoveries!");
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleUpvote = (id: string) => {
    setUpvotedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        setUpvoteDeltas((d) => ({ ...d, [id]: (d[id] || 0) - 1 }));
        toast.info("Upvote removed");
        return prev.filter((x) => x !== id);
      } else {
        setUpvoteDeltas((d) => ({ ...d, [id]: (d[id] || 0) + 1 }));
        toast.success("Upvoted! 🔥");
        return [...prev, id];
      }
    });
  };

  const getUpvotes = (d: Discovery) => {
    const delta = upvoteDeltas[d.id] || 0;
    return Math.max(1, d.heat + delta);
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((x) => x !== interest) : [...prev, interest],
    );
  };

  const addDiscovery = (newDoc: Omit<Discovery, "id" | "age" | "heat">) => {
    const item: Discovery = {
      ...newDoc,
      id: `custom-${Date.now()}`,
      age: "Just now",
      heat: 99,
    };
    setDiscoveries((prev) => [item, ...prev]);
    toast.success("🎉 Buzz published successfully! It is now live on the feed.");
    setIsSubmitModalOpen(false);
  };

  const [isSyncingRadar, setIsSyncingRadar] = useState<boolean>(false);

  const syncLiveRadar = async (silent: boolean = false) => {
    setIsSyncingRadar(true);
    if (!silent) {
      toast.info("⚡ Ingesting live AI tools from GitHub, Hugging Face, and Launch Feeds...");
    }

    try {
      const result = await runFullIngestionPipeline();
      if (result.items && result.items.length > 0) {
        setDiscoveries((prev) => {
          const existingUrls = new Set(prev.map((p) => p.websiteUrl?.toLowerCase()));
          const newItems = result.items.filter(
            (item) => !existingUrls.has(item.websiteUrl?.toLowerCase()),
          );
          if (newItems.length > 0) {
            toast.success(`⚡ Live Radar Auto-Updated: Ingested ${newItems.length} fresh AI tools!`, {
              description: `New discoveries from GitHub & Hugging Face now live in your feed.`,
            });
            return [...newItems, ...prev];
          }
          return prev;
        });

        if (!silent) {
          toast.success(`🎉 Live Radar synced! Ingested ${result.totalIngested} trending AI tools & models.`, {
            description: `GitHub: ${result.sources.github} · Hugging Face: ${result.sources.huggingface} · RSS: ${result.sources.rss}`,
          });
        }
      }
    } catch (err) {
      if (!silent) {
        toast.error("Failed to sync live radar feeds. Try again in a moment.");
      }
    } finally {
      setIsSyncingRadar(false);
    }
  };

  // Autonomous background runner: runs on page load and every 10 minutes
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Run initial background ingest after 2 seconds (so UI mounts instantly)
    const initialTimer = setTimeout(() => {
      syncLiveRadar(true);
    }, 2500);

    // Periodic sync every 10 minutes
    const interval = setInterval(() => {
      syncLiveRadar(true);
    }, 10 * 60 * 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const shareDiscovery = (discovery: Discovery) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      const url = `${window.location.origin}/#feed`;
      navigator.clipboard.writeText(`${discovery.title} - ${discovery.summary} (${url})`);
      toast.success("Link copied to clipboard! Ready to share.", {
        description: discovery.title,
      });
    } else {
      toast.success("Shared: " + discovery.title);
    }
  };

  return (
    <BuzzlokContext.Provider
      value={{
        discoveries,
        savedIds,
        searchQuery,
        setSearchQuery,
        activeLane,
        setActiveLane,
        activeCategory,
        setActiveCategory,
        selectedDiscovery,
        setSelectedDiscovery,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        isClaimModalOpen,
        setIsClaimModalOpen,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        selectedInterests,
        toggleInterest,
        selectedTimeframe,
        setSelectedTimeframe,
        selectedArea,
        setSelectedArea,
        upvotedIds,
        toggleUpvote,
        getUpvotes,
        toggleSave,
        isSaved,
        addDiscovery,
        shareDiscovery,
        isSyncingRadar,
        syncLiveRadar,
      }}
    >
      {children}
    </BuzzlokContext.Provider>
  );
}

export function useBuzzlok() {
  const context = useContext(BuzzlokContext);
  if (!context) {
    throw new Error("useBuzzlok must be used within a BuzzlokProvider");
  }
  return context;
}
