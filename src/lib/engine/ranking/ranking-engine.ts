import { Discovery } from "../../buzzlok-data";
import { matchQueryIntent } from "./intent-matcher";

export interface RankingOptions {
  query?: string;
  lane?: string;
  category?: string;
  area?: string;
  upvotedIds?: string[];
  savedIds?: string[];
}

export function rankAndFilterDiscoveries(
  discoveries: Discovery[],
  options: RankingOptions = {},
): Discovery[] {
  const { query = "", lane = "All AI Tools", category = "All", area = "All Ecosystems" } = options;

  let filtered = discoveries.filter((item) => {
    // Area / Ecosystem Filter
    if (area !== "All Ecosystems" && area !== "All") {
      const matchesArea =
        item.place.toLowerCase().includes(area.toLowerCase()) ||
        (item.modelBackbone && item.modelBackbone.toLowerCase().includes(area.toLowerCase()));
      if (!matchesArea) return false;
    }

    // Category Filter
    if (category !== "All" && category !== "All AI") {
      const matchesCategory =
        item.kind === category ||
        item.tag.toLowerCase().includes(category.toLowerCase()) ||
        item.lanes.some((l) => l.toLowerCase().includes(category.toLowerCase()));
      if (!matchesCategory) return false;
    }

    // Lane Filter
    if (lane !== "All AI Tools") {
      const matchesLane =
        item.lanes.includes(lane) ||
        (lane.includes("Agent") && item.kind === "Agent") ||
        (lane.includes("Reasoning") && item.kind === "Reasoning") ||
        (lane.includes("Free") && (item.priceCategory === "Free" || item.priceCategory === "Open Source")) ||
        (lane.includes("Trending") && item.heat >= 80);
      if (!matchesLane) return false;
    }

    // Search Intent Filter
    if (query.trim()) {
      const intentScore = matchQueryIntent(query, item);
      return intentScore > 0;
    }

    return true;
  });

  // Calculate dynamic rank score for sorting
  return filtered.sort((a, b) => {
    if (query.trim()) {
      const scoreA = matchQueryIntent(query, a) + (a.heat * 0.1);
      const scoreB = matchQueryIntent(query, b) + (b.heat * 0.1);
      return scoreB - scoreA;
    }

    // Default sorting by heat / velocity
    return b.heat - a.heat;
  });
}
