"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { CatalogItem, chairs, desks, getMonitorItems, getNonMonitorItems } from "@/lib/catalog";
import {
  formatIdr,
  getMonitorSelection,
  MAX_MONITOR_QTY,
  WorkspaceSelection,
} from "@/lib/configurator";
import { cn } from "@/lib/utils";
import { Armchair, Blocks, Laptop, Minus, Monitor, Plus, type LucideIcon } from "lucide-react";

interface ItemPickerProps {
  className?: string;
  selection: WorkspaceSelection;
  onDeskSelect: (deskId: string) => void;
  onChairSelect: (chairId: string) => void;
  onAccessoryChange: (accessoryId: string, nextQty: number) => void;
}

type TabId = "desk" | "chair" | "monitor" | "extras";

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "desk", label: "Desk", icon: Laptop },
  { id: "chair", label: "Chair", icon: Armchair },
  { id: "monitor", label: "Monitor", icon: Monitor },
  { id: "extras", label: "Extras", icon: Blocks },
];

function SelectableRow({ item, value }: { item: CatalogItem; value: string }) {
  return (
    <FieldLabel className="rounded-xl transition-all hover:bg-foreground/[0.03] has-data-checked:bg-primary/[0.07] has-data-checked:ring-1 has-data-checked:ring-primary/20">
      <Field orientation="horizontal">
        <RadioGroupItem value={value} />
        <FieldContent>
          <div className="flex items-baseline justify-between gap-2">
            <FieldTitle className="text-[13px]">{item.name}</FieldTitle>
            <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
              {formatIdr(item.monthlyPrice)}/mo
            </span>
          </div>
          <FieldDescription className="text-[11px]">{item.style}</FieldDescription>
        </FieldContent>
      </Field>
    </FieldLabel>
  );
}

function ToggleRow({
  item,
  active,
  onToggle,
}: {
  item: CatalogItem;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <FieldLabel className="rounded-xl transition-all hover:bg-foreground/[0.03] has-data-checked:bg-primary/[0.07] has-data-checked:ring-1 has-data-checked:ring-primary/20">
      <Field orientation="horizontal">
        <Checkbox checked={active} onCheckedChange={() => onToggle()} />
        <FieldContent>
          <div className="flex items-baseline justify-between gap-2">
            <FieldTitle className="text-[13px]">{item.name}</FieldTitle>
            <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
              {formatIdr(item.monthlyPrice)}/mo
            </span>
          </div>
          <FieldDescription className="text-[11px]">{item.style}</FieldDescription>
        </FieldContent>
      </Field>
    </FieldLabel>
  );
}

export function ItemPicker({
  className,
  selection,
  onDeskSelect,
  onChairSelect,
  onAccessoryChange,
}: ItemPickerProps) {
  const [activeTab, setActiveTab] = useState<TabId>("desk");
  const monitorItems = getMonitorItems();
  const toggleAccessories = getNonMonitorItems();
  const monitorSel = getMonitorSelection(selection);
  const selectedMonitor = monitorSel?.item ?? null;
  const selectedMonitorQty = monitorSel?.quantity ?? 0;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-lg backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex gap-0.5 overflow-x-auto border-b border-border/40 px-1.5 pt-1.5 pb-1 sm:px-2 sm:pt-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            size="xs"
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="size-3" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab content */}
      <div
        key={activeTab}
        className="flex max-h-[45vh] flex-col gap-1.5 overflow-y-auto p-2 animate-fade-in sm:gap-2 lg:max-h-[280px]"
      >
        {activeTab === "desk" && (
          <RadioGroup value={selection.deskId} onValueChange={(val: string) => onDeskSelect(val)}>
            {desks.map((desk) => (
              <SelectableRow key={desk.id} item={desk} value={desk.id} />
            ))}
          </RadioGroup>
        )}

        {activeTab === "chair" && (
          <RadioGroup value={selection.chairId} onValueChange={(val: string) => onChairSelect(val)}>
            {chairs.map((chair) => (
              <SelectableRow key={chair.id} item={chair} value={chair.id} />
            ))}
          </RadioGroup>
        )}

        {activeTab === "monitor" && (
          <>
            <RadioGroup
              value={selectedMonitor?.id ?? ""}
              onValueChange={(val: string) => {
                const id = val;
                for (const m of monitorItems) {
                  if (m.id !== id) onAccessoryChange(m.id, 0);
                }
                onAccessoryChange(id, Math.max(1, selectedMonitorQty));
              }}
            >
              {monitorItems.map((item) => (
                <SelectableRow key={item.id} item={item} value={item.id} />
              ))}
            </RadioGroup>
            {selectedMonitor && (
              <div className="mt-1 flex items-center justify-between rounded-lg bg-muted/40 px-3 py-1.5">
                <span className="text-[11px] text-muted-foreground">Quantity</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-5 rounded-md"
                    disabled={selectedMonitorQty <= 1}
                    onClick={() =>
                      onAccessoryChange(selectedMonitor.id, Math.max(1, selectedMonitorQty - 1))
                    }
                  >
                    <Minus className="size-2.5" />
                  </Button>
                  <span className="w-4 text-center text-xs font-semibold tabular-nums">
                    {selectedMonitorQty}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-5 rounded-md"
                    disabled={selectedMonitorQty >= MAX_MONITOR_QTY}
                    onClick={() =>
                      onAccessoryChange(
                        selectedMonitor.id,
                        Math.min(MAX_MONITOR_QTY, selectedMonitorQty + 1),
                      )
                    }
                  >
                    <Plus className="size-2.5" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "extras" &&
          toggleAccessories.map((item) => {
            const isOn = (selection.accessories[item.id] ?? 0) > 0;
            return (
              <ToggleRow
                key={item.id}
                item={item}
                active={isOn}
                onToggle={() => onAccessoryChange(item.id, isOn ? 0 : 1)}
              />
            );
          })}
      </div>
    </div>
  );
}
