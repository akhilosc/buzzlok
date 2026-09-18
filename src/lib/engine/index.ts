import { Discovery } from "../buzzlok-data";
import { ingestAllRawCandidates } from "./ingest";
import { enrichAndNormalizeCandidate, enrichUrlDirectly } from "./enrichment";
import { rankAndFilterDiscoveries, matchQueryIntent } from "./ranking";
import { IngestionResult } from "./types";

export * from "./types";
export * from "./ingest";
export * from "./enrichment";
export * from "./ranking";

/**
 * Runs the complete end-to-end ingestion and auto-enrichment pipeline
 */
export async function runFullIngestionPipeline(): Promise<IngestionResult> {
  const rawCandidates = await ingestAllRawCandidates();

  let ghCount = 0;
  let hfCount = 0;
  let rssCount = 0;

  const enrichedItems: Discovery[] = [];

  for (const candidate of rawCandidates) {
    if (candidate.source === "github") ghCount++;
    if (candidate.source === "huggingface") hfCount++;
    if (candidate.source === "rss" || candidate.source === "producthunt") rssCount++;

    try {
      const normalized = await enrichAndNormalizeCandidate(candidate);
      enrichedItems.push(normalized);
    } catch (err) {
      console.warn(`Failed to enrich candidate ${candidate.title}:`, err);
    }
  }

  return {
    totalIngested: enrichedItems.length,
    sources: {
      github: ghCount,
      huggingface: hfCount,
      rss: rssCount,
    },
    items: enrichedItems,
  };
}

/**
 * Auto-enriches a single URL for founder submission
 */
export async function autoEnrichSubmittedUrl(url: string): Promise<Discovery> {
  return enrichUrlDirectly(url);
}
