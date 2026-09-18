import { RawCandidateItem } from "../types";
import { ingestGithubTrending } from "./github";
import { ingestHuggingFaceTrending } from "./huggingface";
import { ingestProductFeeds } from "./rss-feeds";

export async function ingestAllRawCandidates(): Promise<RawCandidateItem[]> {
  const [ghItems, hfItems, feedItems] = await Promise.all([
    ingestGithubTrending().catch(() => []),
    ingestHuggingFaceTrending().catch(() => []),
    ingestProductFeeds().catch(() => []),
  ]);

  const combined = [...feedItems, ...ghItems, ...hfItems];
  
  // Deduplicate by URL or normalized Title
  const seen = new Set<string>();
  const uniqueItems: RawCandidateItem[] = [];

  for (const item of combined) {
    const key = (item.homepageUrl || item.sourceUrl).toLowerCase().replace(/\/$/, "");
    if (!seen.has(key)) {
      seen.add(key);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}
