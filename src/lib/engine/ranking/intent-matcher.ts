import { Discovery } from "../../buzzlok-data";

export interface IntentMatch {
  score: number;
  matchedTasks: string[];
  matchedKeywords: string[];
}

const TASK_INTENT_MAP: Record<string, string[]> = {
  "coding agents": [
    "code",
    "coding",
    "programmer",
    "developer",
    "ide",
    "autocomplete",
    "debug",
    "refactor",
    "git",
    "terminal",
    "cursor",
    "copilot",
    "devin",
    "trae",
  ],
  "deep reasoning": [
    "reasoning",
    "reason",
    "think",
    "thinking",
    "math",
    "logic",
    "deepseek",
    "o1",
    "o3",
    "benchmark",
    "r1",
    "complex analysis",
  ],
  "text to 3d & image": [
    "image",
    "picture",
    "art",
    "3d",
    "diffusion",
    "midjourney",
    "flux",
    "photorealistic",
    "design",
    "logo",
    "illustration",
  ],
  "generative video": [
    "video",
    "animation",
    "cinematic",
    "movie",
    "motion",
    "sora",
    "runway",
    "kling",
    "luma",
    "minimax",
    "hailuo",
  ],
  "voice cloning": [
    "voice",
    "audio",
    "speech",
    "tts",
    "text to speech",
    "elevenlabs",
    "clone voice",
    "podcast",
    "transcribe",
    "whisper",
  ],
  "autonomous web agent": [
    "agent",
    "autonomous",
    "subagent",
    "browser",
    "automation",
    "manus",
    "operator",
    "crawler",
    "workflow",
  ],
  "research synthesizer": [
    "research",
    "paper",
    "pdf",
    "summary",
    "summarize",
    "scientific",
    "arxiv",
    "data synthesis",
    "perplexity",
  ],
  "fullstack app builder": [
    "app builder",
    "build app",
    "v0",
    "bolt",
    "replit",
    "fullstack",
    "saas",
    "website creator",
    "generator",
  ],
};

export function matchQueryIntent(query: string, discovery: Discovery): number {
  if (!query.trim()) return 1;

  const normalizedQuery = query.toLowerCase().trim();
  const queryTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 1);

  const searchableText = `${discovery.title} ${discovery.summary} ${discovery.tag} ${discovery.kind} ${discovery.place} ${discovery.priceCategory} ${discovery.modelBackbone || ""} ${(discovery.tasks || []).join(" ")} ${discovery.details?.what || ""} ${discovery.details?.why || ""}`.toLowerCase();

  let score = 0;

  // Exact phrase match
  if (searchableText.includes(normalizedQuery)) {
    score += 50;
  }

  // Exact title match bonus
  if (discovery.title.toLowerCase().includes(normalizedQuery)) {
    score += 40;
  }

  // Individual token matches
  for (const token of queryTokens) {
    if (discovery.title.toLowerCase().includes(token)) {
      score += 20;
    } else if (discovery.tag.toLowerCase().includes(token)) {
      score += 15;
    } else if (searchableText.includes(token)) {
      score += 8;
    }
  }

  // Semantic intent mapping
  for (const [taskName, keywords] of Object.entries(TASK_INTENT_MAP)) {
    const hasQueryKeyword = keywords.some(
      (kw) => normalizedQuery.includes(kw) || queryTokens.includes(kw),
    );

    if (hasQueryKeyword) {
      const isToolRelated =
        discovery.tag.toLowerCase().includes(taskName) ||
        (discovery.tasks || []).some((t) => t.toLowerCase().includes(taskName)) ||
        searchableText.includes(taskName);

      if (isToolRelated) {
        score += 35;
      }
    }
  }

  return score;
}
