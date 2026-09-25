import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Toaster } from "../components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-buzz px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.03]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-buzz px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-buzz/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-input bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://buzzlok.com/#website",
      url: "https://buzzlok.com",
      name: "Buzzlok AI",
      description:
        "The real-time AI tools, autonomous agents, and foundation models directory. Find the best AI for coding, deep reasoning, generative video, audio, and workflows.",
      publisher: {
        "@id": "https://buzzlok.com/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://buzzlok.com/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": "https://buzzlok.com/#organization",
      name: "Buzzlok AI",
      url: "https://buzzlok.com",
      logo: {
        "@type": "ImageObject",
        url: "https://buzzlok.com/logo-dark.png",
      },
      sameAs: ["https://twitter.com/Buzzlok"],
    },
    {
      "@type": "ItemList",
      "@id": "https://buzzlok.com/#directory",
      name: "Top AI Tools, Autonomous Agents & Models",
      description:
        "Curated directory of high-signal AI software applications, reasoning models, and agentic workflows.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Claude 3.7 Sonnet (Anthropic)",
          description:
            "Flagship hybrid reasoning foundation model with controllable thinking tokens.",
          url: "https://buzzlok.com/#feed",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cursor: AI Code Editor",
          description:
            "Agentic pair-programming code editor with multi-file composer and codebase indexing.",
          url: "https://buzzlok.com/#feed",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "DeepSeek-R1 Open Reasoning",
          description:
            "Frontier open-weights reasoning model matching OpenAI o1 under MIT license.",
          url: "https://buzzlok.com/#feed",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Devin AI: Autonomous Software Engineer",
          description:
            "Autonomous coding agent equipped with shell, browser sandbox, and editor to solve issues end-to-end.",
          url: "https://buzzlok.com/#feed",
        },
      ],
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "Buzzlok AI — Search & Discover Every AI Tool & Agent" },
      {
        name: "description",
        content:
          "Search and discover verified AI tools, autonomous agents, open-weights reasoning models, and generative workflows. Find the intelligence that moves your world.",
      },
      {
        name: "keywords",
        content:
          "Buzzlok, AI directory, AI search engine, AI tools, autonomous agents, generative AI, LLM models, Cursor AI, Claude 3.7, DeepSeek R1, best AI for coding, open source AI, AI workflows, real-time AI radar",
      },
      { name: "author", content: "Buzzlok AI" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "theme-color", content: "#0a0b0e" },
      { name: "color-scheme", content: "dark" },
      { property: "og:site_name", content: "Buzzlok AI" },
      { property: "og:locale", content: "en_US" },
      {
        property: "og:title",
        content: "Buzzlok AI — Search & Discover Every AI Tool & Agent",
      },
      {
        property: "og:description",
        content:
          "Search and discover verified AI tools, autonomous agents, open-weights reasoning models, and generative workflows. Find the intelligence that moves your world.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://buzzlok.com/" },
      { property: "og:image", content: "https://buzzlok.com/og-image.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Buzzlok AI — Search & Discover Every AI Tool & Agent",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Buzzlok" },
      { name: "twitter:creator", content: "@Buzzlok" },
      { name: "twitter:title", content: "Buzzlok AI — Search & Discover Every AI Tool & Agent" },
      {
        name: "twitter:description",
        content:
          "The real-time discovery engine for artificial intelligence. Search verified AI tools, autonomous agents, and foundation models built for your workflow.",
      },
      { name: "twitter:image", content: "https://buzzlok.com/og-image.svg" },
      { name: "application-name", content: "Buzzlok AI" },
      { name: "apple-mobile-web-app-title", content: "Buzzlok AI" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    ],
    links: [
      { rel: "canonical", href: "https://buzzlok.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Grotesk:wght@300..700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/logo-icon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const gaId = typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Analytics 4 (GA4) */}
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster richColors position="bottom-right" />
    </QueryClientProvider>
  );
}
