import { pulseTicker } from "@/lib/buzzlok-data";

export function Ticker() {
  const items = [...pulseTicker, ...pulseTicker];

  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40 py-3">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
      />
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-buzz" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
