import { Building2, Check, Megaphone, Send, Sparkles } from "lucide-react";
import { useBuzzlok } from "@/context/buzzlok-context";

const submitItems = [
  "Autonomous AI Agent",
  "Coding Co-Pilot / IDE",
  "LLM Reasoning Model",
  "Generative Video & 3D",
  "Voice & Audio Synthesis",
  "Open Source Weights",
  "Workflow Automation",
];

const freeItems = [
  "Verified AI builder profile",
  "Official website & GitHub links",
  "Benchmark scores & model specs",
  "Pricing model & API tiers",
  "Community reviews & upvotes",
];

const paidItems = [
  "Featured AI Directory placement",
  "Guaranteed 60s Spotlight slot",
  "Newsletter digest broadcast",
  "Launch Day traffic burst",
  "Direct developer lead generation",
  "Category sponsor branding",
];

export function Participate() {
  const { setIsSubmitModalOpen, setIsClaimModalOpen } = useBuzzlok();

  return (
    <section id="business" className="w-full px-4 sm:px-6 lg:px-8 py-14 scroll-mt-20">
      <div className="w-full grid gap-6 lg:grid-cols-2">
        <div
          id="submit"
          className="reveal glass-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8"
        >
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
              <Send className="size-4" /> Submit an AI Tool
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Anyone can submit an AI tool or agent
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Buzzlok combines automated crawler pipelines with direct submissions from AI founders
              and researchers. Get your model, agent, or developer tool indexed in front of 45,000+
              builders.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {submitItems.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-buzz px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] w-full sm:w-max cursor-pointer"
          >
            Submit an AI Tool <Send className="size-4" />
          </button>
        </div>

        <div className="reveal glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <Building2 className="size-4" /> For AI Founders & Teams
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Claim your AI product page</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-border bg-card/40 p-4">
              <div>
                <p className="text-sm font-bold">Free AI Listing</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Always free for open models & tools
                </p>
                <ul className="mt-4 space-y-2">
                  {freeItems.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-live" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setIsClaimModalOpen(true)}
                className="mt-5 rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors w-full cursor-pointer"
              >
                Claim Free Profile
              </button>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-buzz/40 bg-buzz/5 p-4">
              <div>
                <p className="inline-flex items-center gap-1.5 text-sm font-bold text-buzz">
                  <Megaphone className="size-4" /> Featured Spotlight
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  For high-reach distribution
                </p>
                <ul className="mt-4 space-y-2">
                  {paidItems.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-buzz" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setIsClaimModalOpen(true)}
                className="mt-5 rounded-xl bg-buzz px-3.5 py-2 text-xs font-bold text-primary-foreground hover:scale-105 transition-transform w-full shadow-sm cursor-pointer"
              >
                Promote AI Tool
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
