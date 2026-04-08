"use client";

import { useEffect, useMemo, useState } from "react";
import { useProgress } from "@react-three/drei";
import { ItemPicker } from "@/components/workspace/item-picker";
import { SetupSummary } from "@/components/workspace/setup-summary";
import { WorkspacePreview } from "@/components/workspace/workspace-preview";
import {
  getMonthlyTotal,
  getSummaryLines,
  initialWorkspaceSelection,
  WorkspaceSelection,
} from "@/lib/configurator";

function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold tracking-tight">Preparing your workspace</h2>
        <p className="text-sm text-muted-foreground">Loading 3D assets&hellip;</p>
      </div>
      <div className="h-1.5 w-56 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground/70 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs tabular-nums text-muted-foreground">{Math.round(progress)}%</p>
    </div>
  );
}

export function WorkspaceBuilder() {
  const { progress, loaded, total } = useProgress();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (progress >= 100 && total > 0 && loaded === total) {
      const t = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(t);
    }
  }, [progress, loaded, total]);

  const [selection, setSelection] = useState<WorkspaceSelection>(initialWorkspaceSelection);

  const monthlyTotal = useMemo(() => getMonthlyTotal(selection), [selection]);
  const summaryLines = useMemo(() => getSummaryLines(selection), [selection]);

  if (!ready) {
    return <LoadingScreen progress={progress} />;
  }

  const pickerProps = {
    selection,
    onDeskSelect: (deskId: string) => setSelection((prev) => ({ ...prev, deskId })),
    onChairSelect: (chairId: string) => setSelection((prev) => ({ ...prev, chairId })),
    onAccessoryChange: (accessoryId: string, nextQty: number) =>
      setSelection((prev) => {
        const nextAccessories = { ...prev.accessories };
        if (nextQty <= 0) {
          delete nextAccessories[accessoryId];
        } else {
          nextAccessories[accessoryId] = nextQty;
        }
        return { ...prev, accessories: nextAccessories };
      }),
  };

  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_280px] lg:items-start">
      <div className="relative">
        <WorkspacePreview selection={selection} />

        {/* Floating picker — only on lg+ */}
        <div
          className="hidden lg:block absolute inset-x-0 bottom-4 z-20 animate-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          <div className="mx-auto w-full max-w-[580px]">
            <ItemPicker {...pickerProps} />
          </div>
        </div>
      </div>

      {/* Mobile picker — below preview */}
      <div className="lg:hidden animate-slide-up" style={{ animationDelay: "150ms" }}>
        <ItemPicker {...pickerProps} />
      </div>

      <div style={{ animationDelay: "200ms" }}>
        <SetupSummary lines={summaryLines} total={monthlyTotal} />
      </div>
    </div>
  );
}
