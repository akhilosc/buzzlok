export type DiscoveryKind =
  | "Agent"
  | "Coding"
  | "Reasoning"
  | "Vision"
  | "Audio"
  | "Tool"
  | "OpenSource"
  | "Breakthrough"
  | "New"
  | "Event"
  | "Place"
  | "Deal"
  | "Trend"
  | "Product"
  | "Useful"
  | "Experience";

export type PriceCategory =
  "Free" | "Freemium" | "Open Source" | "Paid" | "Free Trial" | "Under ₹200" | "Ticketed" | "Deal";

export type DiscoveryDetails = {
  what: string;
  why: string;
  matters: string;
  action: string;
  location?: string;
  timing?: string;
  price?: string;
  verified?: boolean;
  websiteUrl?: string;
  modelBackbone?: string;
  stars?: string;
};

export type Discovery = {
  id: string;
  tag: string;
  icon: string;
  kind: DiscoveryKind;
  title: string;
  summary: string;
  place: string; // Ecosystem / Creator / Platform
  age: string;
  heat: number;
  lanes: string[];
  interests: string[];
  priceCategory: PriceCategory;
  modelBackbone?: string;
  websiteUrl?: string;
  tasks?: string[];
  details?: DiscoveryDetails;
};

export const popularTasks = [
  { icon: "💻", label: "Coding Agents", query: "code" },
  { icon: "🧠", label: "Deep Reasoning", query: "reasoning" },
  { icon: "🎨", label: "Text to 3D & Image", query: "image" },
  { icon: "🎬", label: "Generative Video", query: "video" },
  { icon: "🎙️", label: "Voice Cloning", query: "voice" },
  { icon: "🤖", label: "Autonomous Web Agent", query: "agent" },
  { icon: "📊", label: "Research Synthesizer", query: "research" },
  { icon: "⚡", label: "Fullstack App Builder", query: "app" },
  { icon: "🎵", label: "AI Music Studio", query: "music" },
  { icon: "📝", label: "Pitch Deck & Copy", query: "writing" },
  { icon: "🖥️", label: "Local LLM Runner", query: "local" },
  { icon: "⚡", label: "Ultra-Fast LPU", query: "inference" },
];

export const lanes = [
  "All AI Tools",
  "🔥 Trending Today",
  "⚡ New Launches",
  "🤖 Autonomous Agents",
  "🧠 Reasoning Models",
  "💸 Free & Open Source",
  "⭐ Editor's Choice",
] as const;

export const categories: { label: string; kind?: DiscoveryKind; icon: string; iconUrl?: string }[] = [
  { label: "AI Agents & Autonomy", kind: "Agent", icon: "🤖", iconUrl: "/icons/categories/agents.png" },
  { label: "Coding & Dev Tools", kind: "Coding", icon: "💻", iconUrl: "/icons/categories/coding.png" },
  { label: "Reasoning & LLMs", kind: "Reasoning", icon: "🧠", iconUrl: "/icons/categories/reasoning.png" },
  { label: "Image & 3D Gen", kind: "Vision", icon: "🎨", iconUrl: "/icons/categories/image.png" },
  { label: "Video & Motion AI", kind: "Vision", icon: "🎬", iconUrl: "/icons/categories/video.png" },
  { label: "Voice & Audio AI", kind: "Audio", icon: "🎙️", iconUrl: "/icons/categories/voice.png" },
  { label: "Research & Data", kind: "Reasoning", icon: "📊", iconUrl: "/icons/categories/research.png" },
  { label: "Productivity & Workflows", kind: "Tool", icon: "⚡", iconUrl: "/icons/categories/productivity.png" },
  { label: "Open Source & Weights", kind: "OpenSource", icon: "🌐", iconUrl: "/icons/categories/opensource.png" },
  { label: "Writing & Content", kind: "Tool", icon: "✍️", iconUrl: "/icons/categories/writing.png" },
  { label: "Music & Audio", kind: "Audio", icon: "🎵", iconUrl: "/icons/categories/music.png" },
];

export const neighborhoods = [
  "All Ecosystems",
  "Anthropic Claude",
  "Cursor Ecosystem",
  "OpenAI GPT",
  "DeepSeek",
  "Open Source / HuggingFace",
  "Google DeepMind",
  "Meta Llama",
  "Groq LPU",
];

export const initialDiscoveries: Discovery[] = [
  {
    id: "d1",
    tag: "🔥 BREAKTHROUGH",
    icon: "🧠",
    kind: "Reasoning",
    title: "Claude 3.7 Sonnet with Hybrid Reasoning",
    summary:
      "Anthropic's flagship model dynamically switches between instant response and extended thinking tokens. Crushes SWE-bench Verified at 70.3%.",
    place: "Anthropic Claude",
    age: "42 sec ago",
    heat: 99,
    lanes: ["All AI Tools", "🔥 Trending Today", "🧠 Reasoning Models", "⭐ Editor's Choice"],
    interests: ["LLM Reasoning", "Code Generation", "Autonomous Agents"],
    priceCategory: "Freemium",
    modelBackbone: "Claude 3.7 Sonnet",
    websiteUrl: "https://claude.ai",
    tasks: ["Coding", "Complex Reasoning", "Fullstack Architecture", "Code Review"],
    details: {
      what: "The world's first hybrid reasoning foundation model offering controllable test-time thinking budgets.",
      why: "Eliminates the trade-off between ultra-fast conversational answers and deep mathematical and architectural analysis.",
      matters:
        "Sets the new benchmark for autonomous coding agents with 70.3% on SWE-bench Verified, surpassing specialized competitive models.",
      action:
        "Access via Claude Chat, the Anthropic API, Cursor, or AWS Bedrock with configurable thinking token limits.",
      location: "Anthropic Cloud & API",
      timing: "Live Globally",
      price: "Free tier · $20/mo Pro · API Pay-per-token",
      verified: true,
      stars: "Top SOTA",
    },
  },
  {
    id: "d2",
    tag: "💻 CODING SOTA",
    icon: "⚡",
    kind: "Coding",
    title: "Cursor: The AI Code Editor That Writes Features",
    summary:
      "Fork of VS Code with deep semantic codebase indexing, multi-file Agent Composer, and predictive next-action tab completion.",
    place: "Cursor Ecosystem",
    age: "3 min ago",
    heat: 98,
    lanes: ["All AI Tools", "🔥 Trending Today", "🤖 Autonomous Agents", "⭐ Editor's Choice"],
    interests: ["Code Generation", "Autonomous Agents", "Workflow Automation"],
    priceCategory: "Freemium",
    modelBackbone: "Claude 3.7 & GPT-4o",
    websiteUrl: "https://cursor.com",
    tasks: ["Codebase Indexing", "Multi-file Editing", "Bug Fixing", "Terminal Automation"],
    details: {
      what: "An AI-native fork of VS Code built from the ground up for agentic pair-programming.",
      why: "Understands your entire repository through vector embeddings and executes changes across dozens of files simultaneously.",
      matters:
        "Became the fastest-growing developer tool in history, dramatically accelerating software shipping cycles.",
      action:
        "Download for macOS, Windows, or Linux and import your existing VS Code extensions in one click.",
      location: "macOS · Windows · Linux",
      timing: "v0.46 Live",
      price: "Free 2-week trial · $20/mo Pro",
      verified: true,
      stars: "45k+ Developers",
    },
  },
  {
    id: "d3",
    tag: "💸 OPEN SOURCE",
    icon: "🌐",
    kind: "OpenSource",
    title: "DeepSeek-R1: Open-Weights Frontier Reasoning",
    summary:
      "Massive open-source reasoning model trained purely via large-scale reinforcement learning. Matches OpenAI o1 performance under MIT license.",
    place: "DeepSeek",
    age: "8 min ago",
    heat: 97,
    lanes: ["All AI Tools", "🔥 Trending Today", "🧠 Reasoning Models", "💸 Free & Open Source"],
    interests: ["LLM Reasoning", "Open Source Weights", "Fine-Tuning & RAG"],
    priceCategory: "Open Source",
    modelBackbone: "DeepSeek-R1-671B",
    websiteUrl: "https://github.com/deepseek-ai/DeepSeek-R1",
    tasks: ["Math Proofs", "Algorithmic Coding", "Logic Synthesis", "Distilled Quantization"],
    details: {
      what: "Open-source 671B Mixture-of-Experts reasoning model that popularized pure RL training without supervised fine-tuning.",
      why: "Completely open weights under MIT license with distilled 1.5B to 70B models running seamlessly on local consumer hardware.",
      matters:
        "Democratized frontier reasoning, disrupting proprietary pricing models and spurring global local AI adoption.",
      action:
        "Download weights on Hugging Face or run quantized versions locally via Ollama with 'ollama run deepseek-r1'.",
      location: "Hugging Face & GitHub",
      timing: "Apache/MIT Licensed",
      price: "100% Free & Open Source",
      verified: true,
      stars: "80k+ GitHub Stars",
    },
  },
  {
    id: "d4",
    tag: "🤖 AUTONOMOUS AGENT",
    icon: "🤖",
    kind: "Agent",
    title: "Devin AI: The First Autonomous Software Engineer",
    summary:
      "Cognition's AI software engineer that reads issue tickets, plans sprints, debugs tests, and opens clean pull requests autonomously.",
    place: "Anthropic Claude",
    age: "14 min ago",
    heat: 95,
    lanes: ["All AI Tools", "🤖 Autonomous Agents", "⭐ Editor's Choice"],
    interests: ["Autonomous Agents", "Code Generation", "Workflow Automation"],
    priceCategory: "Paid",
    modelBackbone: "Claude 3.7 & Custom Reasoning",
    websiteUrl: "https://cognition.ai",
    tasks: ["Issue Resolution", "Migration Scripts", "End-to-End Testing", "API Integration"],
    details: {
      what: "An autonomous agent equipped with its own shell, code editor, and browser sandbox to build end-to-end applications.",
      why: "Doesn't just suggest snippets; it executes terminal commands, runs unit tests, fixes compiler bugs, and tests web views.",
      matters:
        "Demonstrates the paradigm shift from autocomplete co-pilots to persistent autonomous digital teammates.",
      action:
        "Connect your GitHub organization to assign backlog bug tickets and feature spikes directly to Devin.",
      location: "Web & GitHub App",
      timing: "Enterprise & Pro Live",
      price: "$500/mo team plan · Usage tiers",
      verified: true,
      stars: "Frontier Agent",
    },
  },
  {
    id: "d5",
    tag: "🎨 GENERATIVE IMAGE",
    icon: "🎨",
    kind: "Vision",
    title: "FLUX.1 Pro: State-of-the-Art Visual Synthesis",
    summary:
      "Black Forest Labs' rectified flow transformer producing photorealistic human skin, intricate hands, and perfect typography in renders.",
    place: "Open Source / HuggingFace",
    age: "22 min ago",
    heat: 94,
    lanes: ["All AI Tools", "🔥 Trending Today", "💸 Free & Open Source"],
    interests: ["Text to 3D", "Generative Video", "Prompt Engineering"],
    priceCategory: "Freemium",
    modelBackbone: "12B Flow Transformer",
    websiteUrl: "https://blackforestlabs.ai",
    tasks: ["Photorealism", "Typography Rendering", "Complex Composition", "Local Inpainting"],
    details: {
      what: "A 12-billion parameter rectified flow transformer that leapfrogs Stable Diffusion and Midjourney in text prompt adherence.",
      why: "Capable of rendering clean legible text, brand signs, and complex hand gestures without visual artifacts.",
      matters:
        "Available in open-weights variants (FLUX.1 schnell & dev) allowing local ComfyUI workflows alongside API access.",
      action:
        "Test for free on Fal.ai, Replicate, or download the Schnell weights for local ComfyUI inference.",
      location: "Hugging Face · Fal.ai · Replicate",
      timing: "v1.1 Ultra Live",
      price: "Open Weights (Dev/Schnell) · $0.05/image API",
      verified: true,
      stars: "Top Image Benchmark",
    },
  },
  {
    id: "d6",
    tag: "🎙️ VOICE & SPEECH",
    icon: "🎙️",
    kind: "Audio",
    title: "ElevenLabs Conversational AI & Emotion Cloning",
    summary:
      "Ultra-low latency (sub-150ms) realistic voice generation with multi-speaker dialogue, emotional nuance, and automated dubbing.",
    place: "OpenAI GPT",
    age: "35 min ago",
    heat: 92,
    lanes: ["All AI Tools", "⚡ New Launches", "⭐ Editor's Choice"],
    interests: ["Voice Cloning", "Workflow Automation", "Autonomous Agents"],
    priceCategory: "Freemium",
    modelBackbone: "Eleven Multilingual v2",
    websiteUrl: "https://elevenlabs.io",
    tasks: ["Voice Cloning", "Audiobook Narration", "Call Center Agents", "Video Dubbing"],
    details: {
      what: "Industry-leading voice AI platform combining instant 1-minute voice cloning with sub-150ms real-time conversational agents.",
      why: "Captures natural human breathing, pauses, laughs, and emotional cadences across 32 languages.",
      matters:
        "Powering the new wave of interactive voice agents across gaming, customer support, and accessible media.",
      action:
        "Create a free account to test voice cloning with 10,000 free monthly credits or build interactive phone agents.",
      location: "Web & REST/WebSocket SDK",
      timing: "Sub-150ms Latency",
      price: "Free 10k credits/mo · $5/mo Starter",
      verified: true,
      stars: "1M+ Audio Creators",
    },
  },
  {
    id: "d7",
    tag: "📊 DEEP RESEARCH",
    icon: "🔍",
    kind: "Reasoning",
    title: "Perplexity Deep Research: Multi-Hop Intelligence",
    summary:
      "Autonomous research agent that traverses hundreds of web pages, parses academic papers, and synthesizes 20-page cited reports.",
    place: "Anthropic Claude",
    age: "45 min ago",
    heat: 91,
    lanes: ["All AI Tools", "🧠 Reasoning Models", "⭐ Editor's Choice"],
    interests: ["Data & Research", "LLM Reasoning", "Workflow Automation"],
    priceCategory: "Freemium",
    modelBackbone: "Deep Research Agent + Claude 3.7",
    websiteUrl: "https://perplexity.ai",
    tasks: [
      "Market Intelligence",
      "Scientific Literature",
      "Competitive Analysis",
      "Due Diligence",
    ],
    details: {
      what: "An agentic research loop that takes a single prompt, plans a 30-step search strategy, and reads deep into paywalled papers.",
      why: "Replaces 8 hours of manual Google searching and paper reading with a thoroughly sourced, peer-reviewed format document.",
      matters:
        "Brings investment-banking level due diligence synthesis to individual researchers, analysts, and founders.",
      action:
        "Click 'Deep Research' mode in Perplexity Pro search bar to initiate a 5-to-10 minute comprehensive study.",
      location: "Web & iOS/Android App",
      timing: "24/7 Real-Time Web",
      price: "Free 5 searches/day · $20/mo Pro",
      verified: true,
      stars: "500k+ Active Researchers",
    },
  },
  {
    id: "d8",
    tag: "🎬 GENERATIVE VIDEO",
    icon: "🎬",
    kind: "Vision",
    title: "Runway Gen-3 Alpha: Hollywood-Grade Video Diffusion",
    summary:
      "High-definition video generation with cinematic lighting, camera trajectory controls, and multi-asset motion brush manipulation.",
    place: "OpenAI GPT",
    age: "1 hr ago",
    heat: 90,
    lanes: ["All AI Tools", "🔥 Trending Today"],
    interests: ["Generative Video", "Text to 3D", "Prompt Engineering"],
    priceCategory: "Freemium",
    modelBackbone: "Gen-3 Video Diffusion",
    websiteUrl: "https://runwayml.com",
    tasks: ["Cinematic B-Roll", "Camera Control", "Text to Video", "Image to Motion"],
    details: {
      what: "Next-generation video foundation model capable of generating photorealistic 10-second cinematic shots at 1080p.",
      why: "Offers director-level control over pan, tilt, zoom, and localized motion brush paths rather than random motion.",
      matters:
        "Already being used in major commercial productions, music videos, and independent film pipelines.",
      action:
        "Sign up on Runway Studio to turn any still image or text prompt into a dynamic camera shot.",
      location: "Web & iOS App",
      timing: "Gen-3 Alpha Turbo Live",
      price: "Free 125 credits · $12/mo Standard",
      verified: true,
      stars: "Award-winning SOTA",
    },
  },
  {
    id: "d9",
    tag: "🎵 MUSIC & AUDIO",
    icon: "🎵",
    kind: "Audio",
    title: "Suno v4: Full Song Composition with Stems",
    summary:
      "Generates broadcast-quality 4-minute songs in any genre complete with soulful vocals, guitar solos, and downloadable separated stems.",
    place: "Open Source / HuggingFace",
    age: "1.5 hr ago",
    heat: 89,
    lanes: ["All AI Tools", "⚡ New Launches", "⭐ Editor's Choice"],
    interests: ["Voice Cloning", "Prompt Engineering"],
    priceCategory: "Freemium",
    modelBackbone: "Suno v4 Audio Transformer",
    websiteUrl: "https://suno.com",
    tasks: ["Songwriting", "Jingle Creation", "Stem Separation", "BGM for Video"],
    details: {
      what: "End-to-end music synthesis engine that transforms simple text descriptions or lyrics into radio-ready songs.",
      why: "v4 introduces true dynamic range, crisp drum transients, complex jazz harmony, and isolated vocal/instrumental tracks.",
      matters:
        "Allows video creators, game developers, and bedroom producers to generate custom soundtracks without licensing friction.",
      action:
        "Type a prompt like '90s grunge ballad about late night debugging' to hear a full 2-verse song in 15 seconds.",
      location: "Web & Mobile",
      timing: "v4 Pro Live",
      price: "50 daily free credits · $10/mo Pro",
      verified: true,
      stars: "2M+ Songs Generated",
    },
  },
  {
    id: "d10",
    tag: "⚡ FULLSTACK AGENT",
    icon: "⚡",
    kind: "Coding",
    title: "v0 by Vercel: Prompt-to-Production React UI",
    summary:
      "Generative UI system that produces accessible, copy-pasteable React, Tailwind CSS, and Shadcn UI components with live interactive preview.",
    place: "Cursor Ecosystem",
    age: "2 hr ago",
    heat: 88,
    lanes: ["All AI Tools", "🔥 Trending Today", "⭐ Editor's Choice"],
    interests: ["Code Generation", "Workflow Automation"],
    priceCategory: "Freemium",
    modelBackbone: "v0 Fine-Tuned LLM",
    websiteUrl: "https://v0.dev",
    tasks: ["Dashboard UI", "Landing Pages", "Accessible Modals", "Tailwind Theme Styling"],
    details: {
      what: "Vercel's generative UI workbench for rapid frontend prototyping using modern component libraries.",
      why: "Understands Radix UI primitives and Tailwind v4 tokens natively, outputting clean, production-ready JSX.",
      matters: "Shrinks UI mockup-to-production turnaround time from days to literally 30 seconds.",
      action:
        "Type 'Modern SaaS analytics billing dashboard with dark mode' and fork the code directly into your React app.",
      location: "Web & CLI ('npx v0 add')",
      timing: "v0 Enterprise Live",
      price: "Free 200 credits/mo · $20/mo Premium",
      verified: true,
      stars: "Vercel Official",
    },
  },
  {
    id: "d11",
    tag: "🧠 DOCUMENT INTEL",
    icon: "📚",
    kind: "Reasoning",
    title: "NotebookLM: AI Audio Overviews & Deep Synthesis",
    summary:
      "Google's viral research tool that grounds Gemini in your uploaded PDFs, Google Docs, and YouTube links, generating 2-host podcast discussions.",
    place: "Google DeepMind",
    age: "2.5 hr ago",
    heat: 87,
    lanes: ["All AI Tools", "🧠 Reasoning Models", "💸 Free & Open Source"],
    interests: ["Data & Research", "LLM Reasoning", "Voice Cloning"],
    priceCategory: "Free",
    modelBackbone: "Gemini 1.5 Pro 2M Context",
    websiteUrl: "https://notebooklm.google.com",
    tasks: ["PDF Summarization", "Podcast Deep Dives", "Study Guides", "Source-Grounded Citations"],
    details: {
      what: "A personalized AI notebook powered by Gemini 1.5 Pro's 2-million token context window, strictly grounded in your sources.",
      why: "Features the viral 'Audio Overview' button that turns dry whitepapers into witty, natural two-host conversational podcasts.",
      matters:
        "Zero hallucination risk because all insights and answers link directly to page and paragraph citations.",
      action:
        "Upload up to 50 PDFs, YouTube links, or lecture notes and click 'Generate Audio Overview'.",
      location: "Google Workspace & Web",
      timing: "100% Free Globally",
      price: "100% Free",
      verified: true,
      stars: "Google Labs",
    },
  },
  {
    id: "d12",
    tag: "⚡ ULTRA-FAST INFERENCE",
    icon: "🚀",
    kind: "Tool",
    title: "Groq LPU: 500 Tokens/Sec Instant LLM Engine",
    summary:
      "Language Processing Unit (LPU) silicon that eliminates generation lag. Runs Llama 3.3 70B and DeepSeek-R1 at blistering speeds.",
    place: "Groq LPU",
    age: "3 hr ago",
    heat: 86,
    lanes: ["All AI Tools", "⚡ New Launches", "💸 Free & Open Source"],
    interests: ["Open Source Weights", "Workflow Automation", "Autonomous Agents"],
    priceCategory: "Free Trial",
    modelBackbone: "LPU Tensor Architecture",
    websiteUrl: "https://groq.com",
    tasks: [
      "Real-time Voice Agents",
      "Low Latency Chat",
      "High Throughput Batching",
      "API Acceleration",
    ],
    details: {
      what: "Custom hardware designed specifically for sequential tensor computation, running LLMs 10x faster than Nvidia H100s.",
      why: "Enables natural conversational turn-taking and instant UI streaming without perceptible waiting.",
      matters:
        "The critical infrastructure enabling real-time autonomous voice agents and instantaneous code autocompletion.",
      action:
        "Try models live at groq.com or obtain free developer API keys compatible with the standard OpenAI SDK format.",
      location: "Cloud API & Groq Playground",
      timing: "Sub-30ms First Token",
      price: "Free Developer Tier · Pay-as-you-go",
      verified: true,
      stars: "500+ tok/s SOTA",
    },
  },
  {
    id: "d13",
    tag: "🌐 AGENTIC ENVIRONMENT",
    icon: "⚡",
    kind: "Coding",
    title: "Bolt.new: Prompt-to-Fullstack Web Containers",
    summary:
      "In-browser AI web developer that spins up Node.js runtimes in WebAssembly, installs npm packages, runs dev servers, and deploys live.",
    place: "Cursor Ecosystem",
    age: "4 hr ago",
    heat: 85,
    lanes: ["All AI Tools", "🔥 Trending Today", "🤖 Autonomous Agents"],
    interests: ["Code Generation", "Autonomous Agents", "Fullstack App Builder"],
    priceCategory: "Freemium",
    modelBackbone: "Claude 3.7 & WebContainers",
    websiteUrl: "https://bolt.new",
    tasks: [
      "Fullstack Prototyping",
      "Bug Reproduction",
      "Database Integrations",
      "Netlify Deployment",
    ],
    details: {
      what: "An AI-powered development environment that runs completely inside browser WebContainers without local setup.",
      why: "Can scaffold fullstack Next.js, Remix, Vite, or Astro apps, execute terminal commands, and fix runtime errors on the fly.",
      matters:
        "Lowers the barrier to software creation by letting anyone build, run, and share full web apps through conversation.",
      action:
        "Go to bolt.new, describe the app you want to build, and watch it spin up live in under 60 seconds.",
      location: "Web Browser (Wasm)",
      timing: "v2 Engine Live",
      price: "Free 150k tokens/day · $20/mo Pro",
      verified: true,
      stars: "StackBlitz Official",
    },
  },
  {
    id: "d14",
    tag: "👤 AI AVATARS",
    icon: "🎭",
    kind: "Vision",
    title: "HeyGen Interactive Avatar & Video Localization",
    summary:
      "Generates hyper-realistic digital humans with lip-synced voice translation in 175 languages, matching your original voice tone.",
    place: "OpenAI GPT",
    age: "5 hr ago",
    heat: 84,
    lanes: ["All AI Tools", "⚡ New Launches"],
    interests: ["Generative Video", "Voice Cloning", "Workflow Automation"],
    priceCategory: "Freemium",
    modelBackbone: "Gen-2 Avatar Engine",
    websiteUrl: "https://heygen.com",
    tasks: ["Video Translation", "Customer Avatars", "Training Videos", "Personalized Sales Pitch"],
    details: {
      what: "An AI video generation platform producing studio-quality videos with realistic speaking avatars from text scripts.",
      why: "Its Video Translate feature automatically resyncs mouth movements to match translated audio in 175+ dialects.",
      matters:
        "Allows global companies to localize marketing and training videos seamlessly without expensive reshoots.",
      action:
        "Upload a 2-minute video to generate your custom digital twin avatar with instant multi-language translation.",
      location: "Web & API SDK",
      timing: "Sub-5 Min Video Rendering",
      price: "Free 1 credit · $29/mo Creator",
      verified: true,
      stars: "40k+ Enterprises",
    },
  },
  {
    id: "d15",
    tag: "🎙️ FAST SPEECH AI",
    icon: "🎧",
    kind: "Audio",
    title: "Whisper Large v3 Turbo: 8x Faster Audio Transcription",
    summary:
      "OpenAI's streamlined open-source speech recognition model delivering near-perfect multi-lingual accuracy at 8x the inference speed.",
    place: "Open Source / HuggingFace",
    age: "6 hr ago",
    heat: 83,
    lanes: ["All AI Tools", "💸 Free & Open Source"],
    interests: ["Open Source Weights", "Data & Research"],
    priceCategory: "Open Source",
    modelBackbone: "Whisper v3 Turbo 800M",
    websiteUrl: "https://github.com/openai/whisper",
    tasks: [
      "Audio Transcription",
      "Timestamp Diarization",
      "Subtitle Translation",
      "Voice Commands",
    ],
    details: {
      what: "An 800-million parameter distilled transformer for speech-to-text with exceptional noise immunity.",
      why: "Reduces transformer decoder layers from 32 to 4, maintaining benchmark word error rates while accelerating throughput 800%.",
      matters:
        "Enables offline on-device transcription on Mac M-series chips and budget edge hardware with zero cloud fees.",
      action:
        "Run locally via 'pip install openai-whisper' or integrate via Hugging Face Transformers.",
      location: "Hugging Face & GitHub",
      timing: "MIT License",
      price: "100% Free & Open Source",
      verified: true,
      stars: "65k+ GitHub Stars",
    },
  },
  {
    id: "d16",
    tag: "📝 NOTETAKING CO-PILOT",
    icon: "📓",
    kind: "Tool",
    title: "Granola: The AI Notepad That Preserves Your Voice",
    summary:
      "A distraction-free meeting notepad that transcribes audio in the background and enriches your handwritten bullet points without generic fluff.",
    place: "Anthropic Claude",
    age: "7 hr ago",
    heat: 82,
    lanes: ["All AI Tools", "⭐ Editor's Choice"],
    interests: ["Workflow Automation", "LLM Reasoning"],
    priceCategory: "Freemium",
    modelBackbone: "Claude 3.5 & Custom Whisper",
    websiteUrl: "https://granola.ai",
    tasks: ["Meeting Minutes", "Action Items Extraction", "Client Briefs", "Interview Debriefs"],
    details: {
      what: "An elegant Mac notepad designed for founders and product managers during Zoom, Google Meet, and in-person chats.",
      why: "Unlike intrusive meeting bots that join calls, Granola runs quietly on your machine and enhances your own raw notes.",
      matters:
        "Solves the 'AI summary overload' problem by keeping human intent at the core of meeting documentation.",
      action:
        "Download the macOS client and take notes normally; Granola will fill in missing details with one click.",
      location: "macOS Native App",
      timing: "v1.4 Live",
      price: "Free 25 meetings · $10/mo Pro",
      verified: true,
      stars: "Top Product Hunt 2024",
    },
  },
  {
    id: "d17",
    tag: "🎨 AESTHETIC SOTA",
    icon: "🖼️",
    kind: "Vision",
    title: "Midjourney v7: Cinematic Lighting & Cohesive Styles",
    summary:
      "The undisputed king of visual aesthetics introduces consistent multi-character storytelling, texture depth, and web-first creation canvas.",
    place: "OpenAI GPT",
    age: "8 hr ago",
    heat: 81,
    lanes: ["All AI Tools", "🔥 Trending Today"],
    interests: ["Text to 3D", "Generative Video", "Prompt Engineering"],
    priceCategory: "Paid",
    modelBackbone: "Midjourney v7 Neural Architecture",
    websiteUrl: "https://midjourney.com",
    tasks: ["Storyboarding", "Concept Art", "Photorealistic Portraits", "Architectural Rendering"],
    details: {
      what: "The premier AI image synthesizer known for artistic flair, volumetric lighting, and fine texture resolution.",
      why: "v7 introduces character and scene consistency flags (--cref and --sref) allowing coherent comic and film storyboarding.",
      matters:
        "Remains the gold standard tool for concept artists, game studios, and creative directors worldwide.",
      action:
        "Create on the web editor or Discord by prompting with artistic parameters, aspect ratios, and lighting styles.",
      location: "Web Canvas & Discord",
      timing: "v7 Release Candidate",
      price: "$10/mo Basic · $30/mo Standard",
      verified: true,
      stars: "Industry Benchmark",
    },
  },
  {
    id: "d18",
    tag: "🚀 FULLSTACK BUILDER",
    icon: "⚡",
    kind: "Coding",
    title: "v0 by Vercel: Generative UI & Fullstack Builder",
    summary:
      "Generative user interface and fullstack application builder producing modern React, Next.js, and Tailwind components with live rendering.",
    place: "Vercel Ecosystem",
    age: "5 hr ago",
    heat: 84,
    lanes: ["All AI Tools", "⚡ New Launches", "⭐ Editor's Choice"],
    interests: ["Code Generation", "Fullstack App Builder", "Workflow Automation"],
    priceCategory: "Freemium",
    modelBackbone: "Claude 3.7 & GPT-4o",
    websiteUrl: "https://v0.dev",
    tasks: [
      "Generative UI",
      "Next.js App Router",
      "Design Systems",
      "Fullstack Components",
    ],
    details: {
      what: "An AI-powered design-to-code generator that creates production-ready frontend components and fullstack applications.",
      why: "Prompt in natural language to generate accessible React components styled with Tailwind CSS and copy directly into your codebase.",
      matters:
        "Standardizes generative UI development with native Vercel and React Server Component integration.",
      action:
        "Explore v0.dev to generate, iterate on, and copy fullstack components directly into your application.",
      location: "Cloud Platform",
      timing: "Instant Cloud Deploy",
      price: "Free tier · $20/mo Premium",
      verified: true,
      stars: "Vercel Flagship AI",
    },
  },
];

export const pulseTicker = [
  "Claude 3.7 Sonnet introduces hybrid reasoning with controllable thinking budgets",
  "Cursor announces multi-agent background codebase refactoring in v0.46",
  "DeepSeek-R1 open weights reach 80k GitHub stars with widespread local adoption",
  "ElevenLabs releases sub-150ms conversational voice engine with emotion control",
  "Runway Gen-3 Alpha integrates multi-camera trajectory and motion brush manipulation",
  "FLUX.1 Pro sets new state-of-the-art benchmark in typography rendering and hands",
  "Perplexity Deep Research performs autonomous 30-step literature synthesis into cited reports",
  "Suno v4 launches studio-quality full song synthesis with downloadable audio stems",
  "Groq achieves 520 tokens/second on Llama 3.3 70B inference with custom LPUs",
  "NotebookLM introduces custom interactive audio deep dive co-hosts",
];

export const sixtySecond = {
  title: "Claude 3.7 Sonnet — The First Hybrid Reasoning Model",
  what: "Anthropic's latest flagship model that dynamically switches between ultra-fast standard responses and extended test-time reasoning tokens.",
  why: "Solves the dilemma between slow thinking models and shallow fast models — developers can configure exact thinking token budgets per API call.",
  matters:
    "Sets the new benchmark for autonomous coding agents with 70.3% on SWE-bench Verified, leapfrogging specialized competitive coding models.",
  action:
    "Available now in Claude Chat, the Anthropic API, Cursor, and AWS Bedrock with customizable thinking budgets.",
};

export const aroundMeByFilter: Record<
  string,
  { icon: string; label: string; count: number; change: string }[]
> = {
  Now: [
    { icon: "🤖", label: "Autonomous Agents", count: 28, change: "+6 this week" },
    { icon: "💻", label: "Coding Co-Pilots", count: 42, change: "Hot category" },
    { icon: "🧠", label: "Reasoning Models", count: 18, change: "+3 new SOTA" },
    { icon: "🎬", label: "Generative Video", count: 25, change: "4K resolution" },
    { icon: "🎙️", label: "Voice Synthesizers", count: 31, change: "Sub-150ms" },
    { icon: "🌐", label: "Open Weights", count: 64, change: "Apache & MIT" },
  ],
  Today: [
    { icon: "🚀", label: "New Launches Today", count: 14, change: "Verified" },
    { icon: "⚡", label: "Model Checkpoints", count: 9, change: "Hugging Face" },
    { icon: "💰", label: "Price Drops & Free Tiers", count: 12, change: "API discounts" },
    { icon: "🏆", label: "Leaderboard Climbers", count: 7, change: "SWE-bench" },
    { icon: "📱", label: "Mobile AI Apps", count: 11, change: "iOS & Android" },
    { icon: "🔥", label: "Trending on X / Reddit", count: 19, change: "Viral tools" },
  ],
  "This Weekend": [
    { icon: "🧩", label: "Hackathon Releases", count: 35, change: "Agentic repos" },
    { icon: "🛠️", label: "Developer SDKs", count: 22, change: "TypeScript & Python" },
    { icon: "🎨", label: "Creative Workflows", count: 48, change: "ComfyUI nodes" },
    { icon: "📊", label: "Research Papers", count: 54, change: "arXiv preprints" },
    { icon: "🎙️", label: "Audio & Music Demos", count: 16, change: "Full songs" },
    { icon: "🛡️", label: "AI Safety Audits", count: 8, change: "Red-team reports" },
  ],
  Nearby: [
    { icon: "🖥️", label: "Local LLMs (Ollama)", count: 38, change: "Run on M-series" },
    { icon: "⚡", label: "Fast LPU Inference", count: 14, change: "500+ tok/s" },
    { icon: "📦", label: "Quantized GGUF Models", count: 45, change: "4-bit & 8-bit" },
    { icon: "🌐", label: "Self-Hosted Web UIs", count: 29, change: "Docker ready" },
    { icon: "🔌", label: "VS Code Extensions", count: 52, change: "Zero config" },
    { icon: "🤖", label: "Local Browser Agents", count: 17, change: "Privacy first" },
  ],
};

export const aroundMe = aroundMeByFilter["Now"];

export const interests = [
  "Autonomous Agents",
  "Code Generation",
  "LLM Reasoning",
  "Generative Video",
  "Voice Cloning",
  "Text to 3D",
  "Workflow Automation",
  "Open Source Weights",
  "Fine-Tuning & RAG",
  "Data & Research",
  "AI Ethics & Safety",
  "Prompt Engineering",
];

export const pipeline = [
  { name: "Scrape & Ingest", desc: "Tracking 200+ AI product launches & GitHub repos daily" },
  { name: "De-noise", desc: "Filtering out low-quality wrappers & dead demo projects" },
  { name: "Benchmark", desc: "Verifying SWE-bench, MMLU-Pro, and latency claims" },
  { name: "Categorize", desc: "Tagging into 12 core AI workflows and task taxonomies" },
  { name: "Pricing Audit", desc: "Classifying Free, Freemium, Open Source, and API rates" },
  { name: "Heat Scoring", desc: "Calculating real-time developer adoption and community buzz" },
  { name: "Personalize", desc: "Matching tools to your tech stack, role, and favorite models" },
];

export const sources = [
  "Hugging Face Hub",
  "GitHub Trending AI",
  "Product Hunt AI",
  "arXiv AI Preprints",
  "Founder Submissions",
  "Developer Social Signals",
  "Anthropic & OpenAI Feeds",
  "Open Source Communities",
];

export const searchPrompts = [
  "Find an AI to build a fullstack React app from prompts...",
  "Find an AI to clone voice with realistic emotion...",
  "Find an autonomous agent for codebase refactoring...",
  "Find an AI to generate 3D game models from text...",
  "Find an AI to analyze 50 PDF research papers...",
  "Find an AI to generate production SQL queries...",
  "Find an open-source model to run locally on Mac M-series...",
];
