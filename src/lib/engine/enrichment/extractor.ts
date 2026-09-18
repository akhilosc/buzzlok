export interface ExtractedWebMetadata {
  url: string;
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string[];
  bodyTextSnippet?: string;
}

export async function extractWebMetadata(url: string): Promise<ExtractedWebMetadata> {
  try {
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(formattedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 BuzzlokAI/1.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return fallbackMetadataFromUrl(url);
    }

    const html = await res.text();
    return parseHtmlMetadata(html, formattedUrl);
  } catch (err) {
    console.warn(`Extraction error for ${url}:`, err);
    return fallbackMetadataFromUrl(url);
  }
}

function parseHtmlMetadata(html: string, url: string): ExtractedWebMetadata {
  const getMetaContent = (nameOrProp: string) => {
    const reg = new RegExp(
      `<meta[^>]*(?:name|property)=["']${nameOrProp}["'][^>]*content=["']([^"']*)["']`,
      "i",
    );
    const match = html.match(reg);
    if (match && match[1]) return match[1];

    const regReversed = new RegExp(
      `<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${nameOrProp}["']`,
      "i",
    );
    const matchRev = html.match(regReversed);
    return matchRev && matchRev[1] ? matchRev[1] : undefined;
  };

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : undefined;
  const description = getMetaContent("description");
  const ogTitle = getMetaContent("og:title");
  const ogDescription = getMetaContent("og:description");
  const ogImage = getMetaContent("og:image");
  const keywordsStr = getMetaContent("keywords");
  const keywords = keywordsStr
    ? keywordsStr.split(",").map((k) => k.trim().toLowerCase())
    : [];

  // Extract clean visible text snippet (strip scripts, styles, html tags)
  const cleanBody = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1500);

  return {
    url,
    title: ogTitle || title,
    description: ogDescription || description,
    ogTitle,
    ogDescription,
    ogImage,
    keywords,
    bodyTextSnippet: cleanBody,
  };
}

function fallbackMetadataFromUrl(url: string): ExtractedWebMetadata {
  let hostname = url;
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    hostname = parsed.hostname.replace(/^www\./, "");
  } catch {}

  const readableName = hostname
    .split(".")[0]
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    url,
    title: `${readableName} AI`,
    description: `Next-generation artificial intelligence tool and agent for ${readableName}.`,
    keywords: ["ai", "tool", readableName.toLowerCase()],
  };
}
