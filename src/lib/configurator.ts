import {
  CatalogItem,
  defaultChairId,
  defaultDeskId,
  getItemById,
  getMonitorItems,
} from "@/lib/catalog";

export interface WorkspaceSelection {
  deskId: string;
  chairId: string;
  accessories: Record<string, number>;
}

export interface SummaryLine {
  id: string;
  name: string;
  quantity: number;
  monthlyPrice: number;
  total: number;
}

export const MAX_ACCESSORY_QTY = 3;
export const MAX_MONITOR_QTY = 2;

export const initialWorkspaceSelection: WorkspaceSelection = {
  deskId: defaultDeskId,
  chairId: defaultChairId,
  accessories: {},
};

const priceCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const formatIdr = (value: number): string => priceCurrency.format(value);

export interface MonitorSelection {
  item: CatalogItem;
  quantity: number;
}

export const hasAccessory = (selection: WorkspaceSelection, id: string): boolean =>
  (selection.accessories[id] ?? 0) > 0;

export const getMonitorSelection = (selection: WorkspaceSelection): MonitorSelection | null => {
  const monitors = getMonitorItems();
  const item = monitors.find((m) => hasAccessory(selection, m.id));
  if (!item) return null;
  return { item, quantity: selection.accessories[item.id] ?? 0 };
};

export const getSummaryLines = (selection: WorkspaceSelection): SummaryLine[] => {
  const desk = getItemById(selection.deskId);
  const chair = getItemById(selection.chairId);

  const lines: SummaryLine[] = [];

  if (desk) {
    lines.push({
      id: desk.id,
      name: desk.name,
      quantity: 1,
      monthlyPrice: desk.monthlyPrice,
      total: desk.monthlyPrice,
    });
  }

  if (chair) {
    lines.push({
      id: chair.id,
      name: chair.name,
      quantity: 1,
      monthlyPrice: chair.monthlyPrice,
      total: chair.monthlyPrice,
    });
  }

  for (const [accessoryId, quantity] of Object.entries(selection.accessories)) {
    if (!quantity) continue;
    const item = getItemById(accessoryId);
    if (!item) continue;
    lines.push({
      id: item.id,
      name: item.name,
      quantity,
      monthlyPrice: item.monthlyPrice,
      total: item.monthlyPrice * quantity,
    });
  }

  return lines;
};

export const getMonthlyTotal = (selection: WorkspaceSelection): number =>
  getSummaryLines(selection).reduce((total, line) => total + line.total, 0);
