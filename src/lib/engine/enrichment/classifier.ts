import { DiscoveryKind, PriceCategory } from "../../buzzlok-data";
import { EnrichedToolData } from "../types";
import { ExtractedWebMetadata } from "./extractor";

export function classifyAndEnrichTool(
  meta: ExtractedWebMetadata,
  extraHints?: { author?: string; stars?: number; license?: string },
): EnrichedToolData {
  const combinedText = `${meta.title || ""} ${meta.description || ""} ${meta.bodyTextSnippet || ""} ${(meta.keywords || []).join(" ")}`.toLowerCase();

  // 1. Classify Kind
  let kind: DiscoveryKind = "Tool";
  if (
    combinedText.includes("agent") ||
    combinedText.includes("autonomous") ||
    combinedText.includes("subagent") ||
    combinedText.includes("agentic")
  ) {
    kind = "Agent";
  } else if (
    combinedText.includes("code") ||
    combinedText.includes("ide") ||
    combinedText.includes("debugger") ||
    combinedText.includes("terminal") ||
    combinedText.includes("python") ||
    combinedText.includes("typescript")
  ) {
    kind = "Coding";
  } else if (
    combinedText.includes("reasoning") ||
    combinedText.includes("thinking") ||
    combinedText.includes("math") ||
    combinedText.includes("benchmark") ||
    combinedText.includes("deepseek") ||
    combinedText.includes("o1") ||
    combinedText.includes("o3")
  ) {
    kind = "Reasoning";
  } else if (
    combinedText.includes("video") ||
    combinedText.includes("cinematic") ||
    combinedText.includes("motion") ||
    combinedText.includes("animation") ||
    combinedText.includes("image") ||
    combinedText.includes("diffusion") ||
    combinedText.includes("3d")
  ) {
    kind = "Vision";
  } else if (
    combinedText.includes("voice") ||
    combinedText.includes("audio") ||
    combinedText.includes("speech") ||
    combinedText.includes("sound") ||
    combinedText.includes("music")
  ) {
    kind = "Audio";
  } else if (
    combinedText.includes("open source") ||
    combinedText.includes("open-weights") ||
    combinedText.includes("github") ||
    extraHints?.license
  ) {
    kind = "OpenSource";
  }

  // 2. Classify Pricing Category
  let priceCategory: PriceCategory = "Freemium";
  if (
    extraHints?.license ||
    combinedText.includes("apache") ||
    combinedText.includes("mit license") ||
    combinedText.includes("open-source") ||
    combinedText.includes("open source") ||
    combinedText.includes("github.com")
  ) {
    priceCategory = "Open Source";
  } else if (
    combinedText.includes("100% free") ||
    combinedText.includes("completely free") ||
    combinedText.includes("free forever")
  ) {
    priceCategory = "Free";
  } else if (combinedText.includes("free trial") || combinedText.includes("start free trial")) {
    priceCategory = "Free Trial";
  } else if (
    combinedText.includes("pricing") ||
    combinedText.includes("enterprise") ||
    combinedText.includes("contact sales")
  ) {
    priceCategory = "Paid";
  }

  // 3. Classify Model Backbone / Ecosystem
  let modelBackbone = "Independent AI Architecture";
  if (combinedText.includes("claude") || combinedText.includes("anthropic")) {
    modelBackbone = "Anthropic Claude";
  } else if (combinedText.includes("openai") || combinedText.includes("gpt-4") || combinedText.includes("o1") || combinedText.includes("o3")) {
    modelBackbone = "OpenAI GPT";
  } else if (combinedText.includes("deepseek")) {
    modelBackbone = "DeepSeek";
  } else if (combinedText.includes("gemini") || combinedText.includes("google")) {
    modelBackbone = "Google Gemini";
  } else if (combinedText.includes("llama") || combinedText.includes("meta")) {
    modelBackbone = "Meta Llama";
  } else if (combinedText.includes("cursor")) {
    modelBackbone = "Cursor Ecosystem";
  }

  // 4. Map Specific Task Tags
  const tasks: string[] = [];
  if (kind === "Agent" || combinedText.includes("agent")) tasks.push("Autonomous Web Agent");
  if (kind === "Coding" || combinedText.includes("code")) tasks.push("Coding Agents");
  if (kind === "Reasoning" || combinedText.includes("reason")) tasks.push("Deep Reasoning");
  if (combinedText.includes("video")) tasks.push("Generative Video");
  if (combinedText.includes("image") || combinedText.includes("3d")) tasks.push("Text to 3D & Image");
  if (combinedText.includes("voice") || combinedText.includes("audio")) tasks.push("Voice Cloning");
  if (combinedText.includes("research")) tasks.push("Research Synthesizer");
  if (combinedText.includes("app") || combinedText.includes("fullstack")) tasks.push("Fullstack App Builder");
  if (tasks.length === 0) tasks.push("Productivity & Workflows");

  // 5. Generate Lanes & Interests
  const lanes: string[] = ["All AI Tools"];
  if (kind === "Agent") lanes.push("🤖 Autonomous Agents");
  if (kind === "Reasoning") lanes.push("🧠 Reasoning Models");
  if (priceCategory === "Open Source" || priceCategory === "Free") lanes.push("💸 Free & Open Source");
  lanes.push("🔥 Trending Today");

  const interests: string[] = [tasks[0], modelBackbone];

  // 6. Clean Title and Descriptions
  let title = (meta.title || "AI Tool").split(/[-–|]/)[0].trim();
  if (title.length < 3) title = "Buzzlok AI Listing";

  const rawSummary = meta.description || `Autonomous AI solution for ${tasks.join(" & ")}.`;
  const summary = rawSummary.length > 140 ? `${rawSummary.slice(0, 137)}...` : rawSummary;

  // 7. Structured 3-part breakdown
  const what = `${title} is a ${priceCategory.toLowerCase()} ${kind.toLowerCase()} platform engineered for ${tasks[0].toLowerCase()}.`;
  const why = `Designed for builders, creators, and teams seeking streamlined ${tasks.join(" and ")} without manual overhead.`;
  const matters = extraHints?.stars
    ? `Proven open-source momentum with over ${extraHints.stars.toLocaleString()} GitHub stars and active community development.`
    : `Powered by ${modelBackbone} with zero-latency response pipelines and modern developer ergonomics.`;

  return {
    title,
    summary,
    kind,
    place: extraHints?.author || modelBackbone,
    priceCategory,
    modelBackbone,
    websiteUrl: meta.url,
    tasks,
    lanes,
    interests,
    details: {
      what,
      why,
      matters,
      action: "Launch Tool",
      verified: true,
      stars: extraHints?.stars ? `${(extraHints.stars / 1000).toFixed(1)}k★` : undefined,
    },
  };
}
