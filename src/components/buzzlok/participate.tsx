import { Building2, Check, Megaphone, Send } from "lucide-react";

const submitItems = [
  "New business",
  "Event",
  "Local discovery",
  "Product",
  "Deal",
  "Experience",
  "What's happening",
];

const freeItems = ["Business profile", "Location & contact", "Photos", "Services", "Opening hours"];
const paidItems = [
  "Featured discovery",
  "Sponsored placement",
  "Local promotion",
  "Event promotion",
  "Deals",
  "Audience targeting",
];

export function Participate() {
  return (
    <section id="business" className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div id="submit" className="reveal glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-buzz">
            <Send className="size-4" /> Submit a Buzz
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Anyone can add a discovery</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Buzzlok doesn't depend only on external data. People add what they find, and others
            save, share, report and verify it.
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
          <button
            type="button"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-buzz px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Submit a Buzz <Send className="size-4" />
          </button>
        </div>

        <div className="reveal glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <Building2 className="size-4" /> For businesses
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Claim your Buzzlok presence</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm font-semibold">Free</p>
              <ul className="mt-3 space-y-2">
                {freeItems.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-live" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-buzz/40 bg-buzz/5 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-buzz">
                <Megaphone className="size-4" /> Paid
              </p>
              <ul className="mt-3 space-y-2">
                {paidItems.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-buzz" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
