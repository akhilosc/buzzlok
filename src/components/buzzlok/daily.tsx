import { useState } from "react";
import { Check, Facebook, Instagram, Link2, Mail, MessageCircle, Twitter } from "lucide-react";
import { toast } from "sonner";

const items = [
  "Top 3 breakthrough AI tools launched today",
  "Benchmark shifts on SWE-bench, MMLU & LMSYS Chatbot Arena",
  "Open-source weights released on Hugging Face & GitHub",
  "Must-try agentic prompts and workflows for developers",
  "AI API price changes, free tier updates, and discounts",
];

export function Daily() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setDone(true);
      toast.success("Welcome to Buzzlok AI Daily! 📬", {
        description: `We'll send your first 5-minute AI intelligence digest to ${email} tomorrow morning.`,
      });
    }
  };

  const handleShare = (channel: string) => {
    const text = "Discover verified AI tools, autonomous agents, and breakthrough models with Buzzlok AI!";
    const url = typeof window !== "undefined" ? window.location.origin : "https://buzzlok.com";

    if (channel === "Copy link") {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard! 📋");
      }
      return;
    }

    if (channel === "WhatsApp") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`,
        "_blank",
      );
    } else if (channel === "X") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else if (channel === "Facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else {
      toast.info(`Sharing to ${channel}...`);
    }
  };

  return (
    <section id="daily" className="w-full px-4 sm:px-6 lg:px-8 py-14 scroll-mt-20">
      <div className="w-full grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--gradient-buzz)" }}
          />
          <p className="relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
            <Mail className="size-4" /> Buzzlok Daily
          </p>
          <h2 className="relative mt-3 text-3xl font-bold sm:text-4xl">
            Five things worth knowing today
          </h2>

          <ol className="relative mt-6 space-y-2">
            {items.map((item, i) => (
              <li
                key={item}
                className="reveal flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="font-display text-sm font-bold text-buzz">{i + 1}</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ol>

          <form
            className="relative mt-7 flex flex-col gap-3 sm:flex-row"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-xl border border-input bg-secondary/50 px-4 py-3 text-sm outline-none transition-colors focus:border-buzz"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-buzz px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              {done ? (
                <>
                  <Check className="size-4" /> You're in!
                </>
              ) : (
                "Get it free"
              )}
            </button>
          </form>
          <p className="relative mt-2 text-xs text-muted-foreground">
            Free, daily, one email. Unsubscribe any time. No spam ever.
          </p>
        </div>

        <div className="reveal glass-panel rounded-[2rem] p-6 sm:p-8">
          <h3 className="text-xl font-semibold">Built to be passed on</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Local finds, deals and events travel by sharing. Every discovery is one tap away from a
            group chat.
          </p>
          <div className="mt-6 grid gap-2">
            {[
              { icon: MessageCircle, label: "WhatsApp" },
              { icon: Instagram, label: "Instagram" },
              { icon: Twitter, label: "X" },
              { icon: Facebook, label: "Facebook" },
              { icon: Link2, label: "Copy link" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleShare(label)}
                className="group flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:border-buzz/50 hover:bg-secondary/80"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-4 text-buzz" />
                  <span>{label}</span>
                </div>
                <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Share →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
