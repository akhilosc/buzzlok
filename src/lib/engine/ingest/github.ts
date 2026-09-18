import { RawCandidateItem } from "../types";

export async function ingestGithubTrending(): Promise<RawCandidateItem[]> {
  const topics = ["ai-agent", "reasoning-model", "generative-ai", "code-assistant", "llm"];
  const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
  const query = `topic:${selectedTopic} stars:>100`;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=15`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Buzzlok-Data-Engine/1.0",
      },
    });

    if (!res.ok) {
      console.warn(`GitHub API response not ok: ${res.status}`);
      return getFallbackGithubItems();
    }

    const data = await res.json();
    if (!data.items || !Array.isArray(data.items)) {
      return getFallbackGithubItems();
    }

    return data.items.map((repo: any): RawCandidateItem => ({
      id: `gh-${repo.id}`,
      source: "github",
      sourceUrl: repo.html_url,
      title: repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
      rawDescription: repo.description || "Open source autonomous AI repository.",
      stars: repo.stargazers_count,
      license: repo.license?.spdx_id || "Open Source",
      author: repo.owner?.login || "Open Source",
      publishedAt: repo.created_at,
      homepageUrl: repo.homepage || repo.html_url,
      rawTags: repo.topics || [selectedTopic],
    }));
  } catch (err) {
    console.warn("Failed to fetch GitHub trending AI repos, using fallback:", err);
    return getFallbackGithubItems();
  }
}

function getFallbackGithubItems(): RawCandidateItem[] {
  return [
    {
      id: "gh-fallback-1",
      source: "github",
      sourceUrl: "https://github.com/vllm-project/vllm",
      title: "vLLM High-Throughput Engine",
      rawDescription: "A high-throughput and memory-efficient LLM serving engine with PagedAttention.",
      stars: 38400,
      license: "Apache-2.0",
      author: "vLLM Project",
      publishedAt: new Date().toISOString(),
      homepageUrl: "https://vllm.ai",
      rawTags: ["llm", "inference", "throughput", "open-source"],
    },
    {
      id: "gh-fallback-2",
      source: "github",
      sourceUrl: "https://github.com/open-interpreter/open-interpreter",
      title: "Open Interpreter",
      rawDescription: "A natural language interface for computers to run code locally in your terminal.",
      stars: 56200,
      license: "AGPL-3.0",
      author: "Open Interpreter",
      publishedAt: new Date().toISOString(),
      homepageUrl: "https://openinterpreter.com",
      rawTags: ["ai-agent", "code-interpreter", "terminal", "python"],
    },
    {
      id: "gh-fallback-3",
      source: "github",
      sourceUrl: "https://github.com/ollama/ollama",
      title: "Ollama Local Model Runner",
      rawDescription: "Get up and running with Llama 3, DeepSeek-R1, Mistral, and other large language models locally.",
      stars: 114000,
      license: "MIT",
      author: "Ollama",
      publishedAt: new Date().toISOString(),
      homepageUrl: "https://ollama.com",
      rawTags: ["local-llm", "reasoning", "macos", "docker"],
    },
  ];
}
