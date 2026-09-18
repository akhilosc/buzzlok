import { RawCandidateItem } from "../types";

export async function ingestHuggingFaceTrending(): Promise<RawCandidateItem[]> {
  const url = "https://huggingface.co/api/models?sort=trendingScore&direction=-1&limit=10&full=false";

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Buzzlok-Data-Engine/1.0",
      },
    });

    if (!res.ok) {
      console.warn(`HuggingFace API status: ${res.status}`);
      return getFallbackHuggingFaceItems();
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return getFallbackHuggingFaceItems();
    }

    return data.slice(0, 8).map((model: any): RawCandidateItem => {
      const modelId = model.id || model._id || "unknown/model";
      const parts = modelId.split("/");
      const author = parts.length > 1 ? parts[0] : "HuggingFace Community";
      const name = parts.length > 1 ? parts[1] : parts[0];

      return {
        id: `hf-${modelId.replace(/[^a-zA-Z0-9]/g, "-")}`,
        source: "huggingface",
        sourceUrl: `https://huggingface.co/${modelId}`,
        title: name.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
        rawDescription: `Trending open-weights model by ${author} with ${model.downloads || 0} downloads and ${model.likes || 0} likes.`,
        likes: model.likes || 0,
        author: author,
        homepageUrl: `https://huggingface.co/${modelId}`,
        rawTags: model.tags || ["open-weights", "llm", "transformers"],
      };
    });
  } catch (err) {
    console.warn("Failed to fetch Hugging Face models, using fallback:", err);
    return getFallbackHuggingFaceItems();
  }
}

function getFallbackHuggingFaceItems(): RawCandidateItem[] {
  return [
    {
      id: "hf-deepseek-ai-deepseek-r1-distill-qwen-32b",
      source: "huggingface",
      sourceUrl: "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
      title: "DeepSeek R1 Distill Qwen 32B",
      rawDescription: "Distilled reasoning model based on Qwen 2.5 with deep mathematical and coding problem-solving tokens.",
      likes: 4200,
      author: "DeepSeek AI",
      homepageUrl: "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
      rawTags: ["reasoning", "distillation", "qwen", "deepseek-r1"],
    },
    {
      id: "hf-black-forest-labs-flux-1-schnell",
      source: "huggingface",
      sourceUrl: "https://huggingface.co/black-forest-labs/FLUX.1-schnell",
      title: "FLUX.1 Schnell Real-Time Diffusion",
      rawDescription: "12B parameter rectified flow transformer capable of generating high-resolution images in 4 steps.",
      likes: 8900,
      author: "Black Forest Labs",
      homepageUrl: "https://huggingface.co/black-forest-labs/FLUX.1-schnell",
      rawTags: ["text-to-image", "diffusion", "open-weights", "fast-inference"],
    },
  ];
}
