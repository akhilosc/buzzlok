const rows = [
  { name: "Inshorts", does: "compresses news" },
  { name: "Google", does: "helps you search" },
  { name: "Instagram", does: "shows social content" },
  { name: "Maps", does: "shows places" },
  { name: "Marketplaces", does: "show things to buy" },
];

export function Positioning() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="reveal text-3xl font-bold sm:text-4xl">Not another feed. A layer.</h2>
        <div className="mt-8 space-y-2 text-left">
          {rows.map((row, i) => (
            <div
              key={row.name}
              className="reveal flex items-center justify-between rounded-2xl border border-border bg-card/50 px-5 py-3.5"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-display text-sm font-semibold">{row.name}</span>
              <span className="text-sm text-muted-foreground">{row.does}</span>
            </div>
          ))}
          <div className="reveal flex items-center justify-between rounded-2xl border border-buzz/50 bg-buzz/10 px-5 py-4">
            <span className="font-display text-sm font-bold text-buzz">BUZZLOK</span>
            <span className="text-sm font-medium">connects the things worth discovering</span>
          </div>
        </div>
      </div>
    </section>
  );
}
