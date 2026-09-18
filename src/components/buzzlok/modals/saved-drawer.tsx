import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBuzzlok } from "@/context/buzzlok-context";
import { Bookmark, Compass, Flame, Trash2, Zap } from "lucide-react";

export function SavedDrawer() {
  const {
    isSavedDrawerOpen,
    setIsSavedDrawerOpen,
    discoveries,
    savedIds,
    toggleSave,
    setSelectedDiscovery,
  } = useBuzzlok();

  const savedList = discoveries.filter((d) => savedIds.includes(d.id));

  return (
    <Dialog open={isSavedDrawerOpen} onOpenChange={setIsSavedDrawerOpen}>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto border-border/80 bg-card/95 p-6 backdrop-blur-2xl sm:rounded-3xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-buzz/40 bg-buzz/10 px-3 py-1 text-xs font-semibold text-buzz w-max">
            <Bookmark className="size-3.5 fill-current" /> My Saved AI Stack
          </div>
          <DialogTitle className="font-display text-2xl font-bold">
            Saved AI Tools ({savedList.length})
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Your personal collection of bookmarked AI tools, autonomous agents, and foundation
            models.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {savedList.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground space-y-3">
              <Bookmark className="mx-auto size-10 stroke-1 text-muted-foreground/50" />
              <p className="text-sm">You haven't saved any AI tools yet.</p>
              <p className="text-xs">
                Click the bookmark icon on any AI card in the feed to save it to your stack!
              </p>
            </div>
          ) : (
            savedList.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/30 p-4 transition-all hover:border-buzz/40 hover:bg-secondary/60"
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-buzz/10 px-2 py-0.5 text-[10px] font-semibold text-buzz">
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{item.place}</span>
                  </div>
                  <h4 className="font-semibold text-sm leading-tight text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{item.summary}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSavedDrawerOpen(false);
                      setSelectedDiscovery(item);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-buzz px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
                  >
                    <Compass className="size-3.5" /> Details
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSave(item.id)}
                    title="Remove from saved"
                    className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
