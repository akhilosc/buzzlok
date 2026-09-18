import { RawCandidateItem } from "../types";

export async function ingestProductFeeds(): Promise<RawCandidateItem[]> {
  // Curated list of verified fresh product launches for the AI Radar
  return [
    {
      id: "feed-trae-ide",
      source: "producthunt",
      sourceUrl: "https://www.trae.ai",
      title: "Trae: Adaptive AI IDE",
      rawDescription: "Adaptive AI code editor integrating Claude 3.7 & GPT-4o for fullstack file generation and workspace agents.",
      author: "ByteDance / Trae Team",
      homepageUrl: "https://www.trae.ai",
      rawTags: ["coding", "ide", "agent", "editor"],
    },
    {
      id: "feed-manus-ai",
      source: "producthunt",
      sourceUrl: "https://manus.im",
      title: "Manus: General Purpose Agent",
      rawDescription: "General autonomous agent capable of executing complex web research, code execution, and data analysis in an isolated cloud VM.",
      author: "Manus AI",
      homepageUrl: "https://manus.im",
      rawTags: ["autonomous-agent", "browser-use", "automation", "cloud-sandbox"],
    },
    {
      id: "feed-minimax-hailuo",
      source: "rss",
      sourceUrl: "https://hailuoai.video",
      title: "MiniMax Hailuo 01 Video Gen",
      rawDescription: "High-frame-rate cinematic generative video engine simulating real-world physics and camera movements.",
      author: "MiniMax",
      homepageUrl: "https://hailuoai.video",
      rawTags: ["video-generation", "cinematic", "physics-simulation"],
    },
    {
      id: "feed-elevenlabs-conversational-ai",
      source: "rss",
      sourceUrl: "https://elevenlabs.io/conversational-ai",
      title: "ElevenLabs Conversational AI Agents",
      rawDescription: "Ultra-low latency interactive voice agents customizable with personality, knowledge base, and phone/web SDKs.",
      author: "ElevenLabs",
      homepageUrl: "https://elevenlabs.io",
      rawTags: ["voice-agent", "low-latency", "realtime-audio"],
    },
  ];
}
