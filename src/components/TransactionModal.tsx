import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, X, ExternalLink, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { explorerTx } from "@/lib/chain";
import { toast } from "sonner";

type Step = "idle" | "confirm" | "mining" | "success" | "error";

export function TransactionModal({
  open,
  onOpenChange,
  hash,
  isPending,
  isConfirming,
  isSuccess,
  error,
  title = "Transaction",
  successLabel = "Transaction confirmed on 0G Mainnet",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  hash?: `0x${string}`;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error?: Error | null;
  title?: string;
  successLabel?: string;
}) {
  let step: Step = "idle";
  if (error) step = "error";
  else if (isSuccess) step = "success";
  else if (isConfirming) step = "mining";
  else if (isPending) step = "confirm";

  const steps: { key: Exclude<Step, "idle">; label: string }[] = [
    { key: "confirm", label: "Confirm in wallet" },
    { key: "mining", label: "Awaiting confirmation" },
    { key: "success", label: "Settled onchain" },
  ];

  const currentIndex =
    step === "confirm" ? 0 : step === "mining" ? 1 : step === "success" ? 2 : -1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="font-display text-2xl">{title}</DialogTitle>
        <DialogDescription>
          {step === "error"
            ? "Something went wrong while processing your transaction."
            : "Track your transaction across the 0G Network in real time."}
        </DialogDescription>

        <div className="mt-4 space-y-3">
          {steps.map((s, i) => {
            const done = step === "error" ? false : i < currentIndex || step === "success";
            const active = i === currentIndex && step !== "success" && step !== "error";
            return (
              <div
                key={s.key}
                className={`flex items-center gap-3 border border-border px-4 py-3 ${
                  active ? "bg-accent" : "bg-card"
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background">
                  {done ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 animate-spin text-foreground" />
                  ) : (
                    <span className="text-xs text-muted-foreground">{i + 1}</span>
                  )}
                </div>
                <span className="text-sm">{s.label}</span>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {hash && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-between border border-border bg-muted/40 px-4 py-3 text-xs"
            >
              <div>
                <p className="uppercase tracking-[0.18em] text-muted-foreground">Tx hash</p>
                <p className="mt-0.5 font-mono text-foreground">
                  {hash.slice(0, 10)}…{hash.slice(-8)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(hash);
                    toast.success("Hash copied");
                  }}
                  className="rounded p-1.5 hover:bg-background"
                  aria-label="Copy hash"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <a
                  href={explorerTx(hash)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 rounded bg-foreground px-2.5 py-1.5 text-background"
                >
                  Explorer <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step === "success" && (
          <p className="mt-4 text-sm text-muted-foreground">{successLabel}</p>
        )}
        {step === "error" && error && (
          <div className="mt-4 flex items-start gap-2 border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <X className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="break-words">{error.message.split("\n")[0]}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
