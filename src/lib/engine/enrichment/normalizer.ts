import { Discovery } from "../../buzzlok-data";
import { RawCandidateItem } from "../types";
import { extractWebMetadata } from "./extractor";
import { classifyAndEnrichTool } from "./classifier";

export async function enrichAndNormalizeCandidate(
  candidate: RawCandidateItem,
): Promise<Discovery> {
  const urlToExtract = candidate.homepageUrl || candidate.sourceUrl;
  const meta = await extractWebMetadata(urlToExtract);

  // Blend metadata with candidate info
  const combinedMeta = {
    ...meta,
    title: candidate.title || meta.title,
    description: candidate.rawDescription || meta.description,
  };

  const enriched = classifyAndEnrichTool(combinedMeta, {
    author: candidate.author,
    stars: candidate.stars,
    license: candidate.license,
  });

  const getEmojiIcon = (kind: string) => {
    switch (kind) {
      case "Agent":
        return "🤖";
      case "Coding":
        return "💻";
      case "Reasoning":
        return "🧠";
      case "Vision":
        return "🎨";
      case "Audio":
        return "🎙️";
      case "OpenSource":
        return "🌐";
      default:
        return "⚡";
    }
  };

  const baseHeat = candidate.stars
    ? Math.min(99, Math.floor(candidate.stars / 500) + 70)
    : Math.floor(Math.random() * 20) + 75;

  return {
    id: candidate.id || `tool-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    tag: enriched.tasks[0] || "AI Discovery",
    icon: getEmojiIcon(enriched.kind),
    kind: enriched.kind,
    title: enriched.title,
    summary: enriched.summary,
    place: enriched.place,
    age: "Just now",
    heat: baseHeat,
    lanes: enriched.lanes,
    interests: enriched.interests,
    priceCategory: enriched.priceCategory,
    modelBackbone: enriched.modelBackbone,
    websiteUrl: candidate.homepageUrl || candidate.sourceUrl,
    tasks: enriched.tasks,
    details: enriched.details,
  };
}

export async function enrichUrlDirectly(url: string): Promise<Discovery> {
  const meta = await extractWebMetadata(url);
  const enriched = classifyAndEnrichTool(meta);

  return {
    id: `custom-${Date.now()}`,
    tag: enriched.tasks[0] || "AI Tool",
    icon: "⚡",
    kind: enriched.kind,
    title: enriched.title,
    summary: enriched.summary,
    place: enriched.place,
    age: "Live",
    heat: 88,
    lanes: enriched.lanes,
    interests: enriched.interests,
    priceCategory: enriched.priceCategory,
    modelBackbone: enriched.modelBackbone,
    websiteUrl: url.startsWith("http") ? url : `https://${url}`,
    tasks: enriched.tasks,
    details: enriched.details,
  };
}
