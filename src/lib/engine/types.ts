import { DiscoveryKind, PriceCategory, Discovery } from "../buzzlok-data";

export interface RawCandidateItem {
  id: string;
  source: "github" | "huggingface" | "producthunt" | "rss" | "manual";
  sourceUrl: string;
  title: string;
  rawDescription: string;
  stars?: number;
  likes?: number;
  license?: string;
  author?: string;
  publishedAt?: string;
  homepageUrl?: string;
  rawTags?: string[];
}

export interface EnrichedToolData {
  title: string;
  summary: string;
  kind: DiscoveryKind;
  place: string;
  priceCategory: PriceCategory;
  modelBackbone: string;
  websiteUrl: string;
  tasks: string[];
  lanes: string[];
  interests: string[];
  details: {
    what: string;
    why: string;
    matters: string;
    action: string;
    verified: boolean;
    stars?: string;
  };
}

export interface IngestionResult {
  totalIngested: number;
  sources: {
    github: number;
    huggingface: number;
    rss: number;
  };
  items: Discovery[];
}
