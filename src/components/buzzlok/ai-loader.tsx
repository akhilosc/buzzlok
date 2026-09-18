import { useEffect, useState } from "react";

export type AILoaderSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AILoaderVariant = "inline" | "card" | "overlay" | "fullscreen" | "icon";

interface AILoaderProps {
  variant?: AILoaderVariant;
  size?: AILoaderSize;
  text?: string;
  subtext?: string;
  className?: string;
  showProgress?: boolean;
}

const sizeMap: Record<AILoaderSize, { container: string; image: string; text: string }> = {
  xs: {
    container: "size-4",
    image: "size-4",
    text: "text-[10px]",
  },
  sm: {
    container: "size-6",
    image: "size-6",
    text: "text-xs",
  },
  md: {
    container: "size-10",
    image: "size-10",
    text: "text-sm",
  },
  lg: {
    container: "size-16",
    image: "size-16",
    text: "text-base",
  },
  xl: {
    container: "size-24",
    image: "size-24",
    text: "text-lg",
  },
  "2xl": {
    container: "size-36 sm:size-44",
    image: "size-36 sm:size-44",
    text: "text-xl",
  },
};

export function AILoader({
  variant = "inline",
  size = "md",
  text,
  subtext,
  className = "",
  showProgress = false,
}: AILoaderProps) {
  const currentSize = sizeMap[size];

  // 1. Standalone Spin Icon
  if (variant === "icon") {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSize.container} ${className}`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 via-fuchsia-500/30 to-amber-500/30 blur-[2px] animate-pulse" />
        <img
          src="/loader-torus-256.png"
          alt="Loading..."
          className={`relative ${currentSize.image} object-contain animate-torus-spin select-none pointer-events-none drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]`}
        />
      </div>
    );
  }

  // 2. Inline Loader (for Buttons / Badges / Input status)
  if (variant === "inline") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSize.container}`}>
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-[1px] animate-pulse" />
          <img
            src="/loader-torus-256.png"
            alt="Loading..."
            className={`relative ${currentSize.image} object-contain animate-torus-spin select-none pointer-events-none drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]`}
          />
        </div>
        {text && <span className={`font-medium text-foreground/90 ${currentSize.text}`}>{text}</span>}
      </div>
    );
  }

  // 3. Card Loader (inside containers / modal sections)
  if (variant === "card") {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-inner ${className}`}
      >
        <div className="relative mb-3 flex items-center justify-center">
          {/* Multi-layered radiant back-glow */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/25 to-amber-500/25 blur-xl animate-torus-pulse" />
          <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md animate-ping-ring" />
          <img
            src="/loader-torus-512.png"
            alt="Loading AI Data..."
            className={`${size === "md" ? "size-14" : currentSize.image} object-contain animate-torus-spin drop-shadow-[0_0_16px_rgba(236,72,153,0.5)] select-none`}
          />
        </div>
        {text && <h4 className="text-sm font-semibold text-foreground tracking-tight">{text}</h4>}
        {subtext && <p className="mt-1 text-xs text-muted-foreground max-w-xs">{subtext}</p>}
      </div>
    );
  }

  // 4. Overlay Loader (for section blur overlays)
  if (variant === "overlay") {
    return (
      <div
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300 ${className}`}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-cyan-500/30 via-purple-500/30 to-amber-500/30 blur-2xl animate-torus-pulse" />
          <img
            src="/loader-torus-512.png"
            alt="Loading..."
            className="size-16 sm:size-20 object-contain animate-torus-spin drop-shadow-[0_0_20px_rgba(56,189,248,0.6)] select-none"
          />
        </div>
        {text && (
          <p className="mt-4 text-xs sm:text-sm font-bold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 animate-pulse">
            {text}
          </p>
        )}
        {subtext && <p className="mt-1 text-xs text-muted-foreground">{subtext}</p>}
      </div>
    );
  }

  // 5. Fullscreen Page / App Loader
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e] px-4 overflow-hidden select-none ${className}`}
    >
      {/* Dynamic Background Atmosphere */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gradient-to-b from-cyan-500/15 via-fuchsia-500/10 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gradient-to-t from-amber-500/10 via-purple-500/10 to-transparent blur-[120px]" />

      <div className="relative flex flex-col items-center text-center max-w-sm">
        {/* Animated Torus Vessel */}
        <div className="relative flex items-center justify-center">
          {/* Deep ambient radiant aura */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-cyan-500/35 via-fuchsia-500/30 to-amber-500/35 blur-3xl animate-torus-pulse" />
          {/* Secondary rotating counter-glow */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-bl from-purple-500/30 via-cyan-400/20 to-pink-500/30 blur-xl animate-torus-spin-reverse opacity-75" />

          {/* Glowing Torus Core */}
          <img
            src="/loader-torus.png"
            alt="Buzzlok AI Loading"
            className="relative size-36 sm:size-44 object-contain animate-torus-spin drop-shadow-[0_0_30px_rgba(168,85,247,0.65)]"
          />
        </div>

        {/* Brand & Loading Label */}
        <div className="mt-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="uppercase text-buzz">BUZZLOK NEURAL RADAR</span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
            {text || "Synthesizing AI Ecosystem..."}
          </h3>

          <p className="text-xs text-muted-foreground/80 max-w-xs mx-auto">
            {subtext || "Streaming live models, autonomous agents, and verified benchmarks"}
          </p>
        </div>

        {/* Progress Bar (if requested) */}
        {showProgress && (
          <div className="mt-6 w-48 h-1 rounded-full bg-white/10 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 animate-marquee rounded-full w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Initial Page Splash Loader with smooth fade-out on initial load.
 */
export function InitialPageLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [phaseText, setPhaseText] = useState("Calibrating Neural Radar...");
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    setMounted(true);

    const t1 = setTimeout(() => {
      setPhaseText("Ingesting Live Autonomous Agents...");
      setProgress(55);
    }, 280);

    const t2 = setTimeout(() => {
      setPhaseText("Synthesizing Verified Models...");
      setProgress(90);
    }, 600);

    const t3 = setTimeout(() => {
      setProgress(100);
    }, 850);

    const t4 = setTimeout(() => {
      setVisible(false);
    }, 1050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e] px-4 transition-all duration-500 ease-out select-none ${
        progress === 100 ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-b from-cyan-500/20 via-fuchsia-500/15 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-t from-amber-500/15 via-purple-500/15 to-transparent blur-[140px]" />

      <div className="relative flex flex-col items-center text-center max-w-sm">
        {/* Glow Torus Vessel */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-cyan-500/40 via-fuchsia-500/30 to-amber-500/40 blur-3xl animate-torus-pulse" />
          <div className="absolute -inset-5 rounded-full bg-gradient-to-bl from-purple-500/35 via-cyan-400/25 to-pink-500/35 blur-xl animate-torus-spin-reverse opacity-80" />

          <img
            src="/loader-torus.png"
            alt="Buzzlok AI"
            className="relative size-36 sm:size-44 object-contain animate-torus-spin drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]"
          />
        </div>

        {/* Brand Header & Dynamic Status */}
        <div className="mt-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wider backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-buzz to-amber-300 font-extrabold">
              BUZZLOK AI
            </span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground transition-all duration-300">
            {phaseText}
          </h3>

          <p className="text-xs text-muted-foreground/80 max-w-xs mx-auto">
            Discover verified AI tools, autonomous agents, and open reasoning models.
          </p>
        </div>

        {/* Neon Rainbow Progress Bar */}
        <div className="mt-6 w-52 h-1.5 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
