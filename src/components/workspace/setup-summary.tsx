"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatIdr, SummaryLine } from "@/lib/configurator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SetupSummaryProps {
  className?: string;
  lines: SummaryLine[];
  total: number;
}

export function SetupSummary({ className, lines, total }: SetupSummaryProps) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-5 shadow-sm lg:sticky lg:top-5",
        className,
      )}
    >
      <h2 className="text-sm font-semibold tracking-tight">Your setup</h2>

      <div className="mt-4 space-y-2">
        {lines.map((line) => (
          <div key={line.id} className="flex items-baseline justify-between gap-3">
            <p className="text-[13px]">
              {line.name}
              {line.quantity > 1 && (
                <span className="text-muted-foreground"> x{line.quantity}</span>
              )}
            </p>
            <p className="shrink-0 text-[13px] tabular-nums text-muted-foreground">
              {formatIdr(line.total)}
            </p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="flex items-baseline justify-between">
        <p className="text-xs text-muted-foreground">Monthly total</p>
        <p className="text-lg font-semibold tabular-nums">{formatIdr(total)}</p>
      </div>

      <Button
        className="mt-4 h-10 w-full rounded-xl text-sm"
        onClick={() =>
          toast.success("Setup submitted!", {
            description: `Your workspace at ${formatIdr(total)}/mo is being processed.`,
            position: "top-right",
          })
        }
      >
        Rent this setup
      </Button>
    </aside>
  );
}
