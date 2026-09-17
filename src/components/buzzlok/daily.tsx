import { useState } from "react";
import { Facebook, Instagram, Link2, Mail, MessageCircle, Twitter } from "lucide-react";

const items = [
  "Something trending",
  "Something happening near you",
  "Something useful",
  "Something worth discovering",
  "Something worth doing",
];

const shares = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Facebook, label: "Facebook" },
  { icon: Link2, label: "Copy link" },
];

export function Daily() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="daily" className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
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
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="font-display text-sm font-bold text-buzz">{i + 1}</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ol>

          <form
            className="relative mt-7 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
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
              className="rounded-xl bg-buzz px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              {done ? "You're in ✓" : "Get it free"}
            </button>
          </form>
          <p className="relative mt-2 text-xs text-muted-foreground">
            Free, daily, one email. Unsubscribe any time.
          </p>
        </div>

        <div className="reveal glass-panel rounded-[2rem] p-6 sm:p-8">
          <h3 className="text-xl font-semibold">Built to be passed on</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Local finds, deals and events travel by sharing. Every discovery is one tap away from a
            group chat.
          </p>
          <div className="mt-6 grid gap-2">
            {shares.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="group flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:border-buzz/50 hover:bg-secondary"
              >
                <Icon className="size-4 text-buzz" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
