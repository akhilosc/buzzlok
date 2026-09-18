import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBuzzlok } from "@/context/buzzlok-context";
import { Building2, Check, CheckCircle2, Megaphone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export function ClaimBusinessModal() {
  const { isClaimModalOpen, setIsClaimModalOpen } = useBuzzlok();
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [planType, setPlanType] = useState<"free" | "paid">("free");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !contactEmail) return;
    setSubmitted(true);
    toast.success("AI founder profile verification received!", {
      description: "Our developer team will verify your product page within 24 hours.",
    });
    setTimeout(() => {
      setSubmitted(false);
      setIsClaimModalOpen(false);
      setBusinessName("");
      setOwnerName("");
      setContactEmail("");
    }, 2000);
  };

  return (
    <Dialog open={isClaimModalOpen} onOpenChange={setIsClaimModalOpen}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-border/80 bg-card/95 p-6 backdrop-blur-2xl sm:rounded-3xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent w-max">
            <Building2 className="size-3.5" /> AI Founder Verification
          </div>
          <DialogTitle className="font-display text-2xl font-bold">
            Claim or Verify Your AI Product Page
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Get your AI tool, model, or autonomous agent verified on Buzzlok to reach 45,000+
            developers and founders looking for AI solutions.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="inline-flex size-14 place-items-center rounded-2xl bg-live/20 text-live">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="text-lg font-bold">Verification Submitted!</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              We've emailed a confirmation link to {contactEmail}. Your AI tool will receive the
              verified badge once approved.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPlanType("free")}
                className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  planType === "free"
                    ? "border-buzz bg-buzz/10 shadow-sm"
                    : "border-border bg-secondary/40 text-muted-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Free Profile</span>
                  {planType === "free" && <Check className="size-4 text-buzz" />}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Official badge, GitHub links, documentation, and community upvotes.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPlanType("paid")}
                className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  planType === "paid"
                    ? "border-accent bg-accent/10 shadow-sm"
                    : "border-border bg-secondary/40 text-muted-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-accent flex items-center gap-1.5">
                    <Megaphone className="size-3.5" /> Featured Spotlight
                  </span>
                  {planType === "paid" && <Check className="size-4 text-accent" />}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Featured placement, 60s breakdown card, and newsletter blast.
                </p>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                AI Tool or Model Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Cursor, DeepSeek-R1, ElevenLabs"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-input bg-secondary/50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-buzz"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Your Name / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Founder / Manager"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-buzz"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="hello@yourbusiness.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2 text-sm outline-none transition-colors focus:border-buzz"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-secondary/40 p-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-live" />
              <span>
                We never share or sell contact data. Only official business emails accepted.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setIsClaimModalOpen(false)}
                className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-buzz px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Submit Verification
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
