export type CatalogCategory = "desk" | "chair" | "accessory";

export interface CatalogItem {
  id: string;
  category: CatalogCategory;
  name: string;
  monthlyPrice: number;
  style: string;
  visual: string;
  modelPath: string;
}

export const desks: CatalogItem[] = [
  {
    id: "desk-walnut-frame",
    category: "desk",
    name: "Walnut Frame Desk",
    monthlyPrice: 70000,
    style: "Walnut top, black metal frame",
    visual: "walnut",
    modelPath: "/3d/desk-walnut.glb",
  },
  {
    id: "desk-studio-cabinet",
    category: "desk",
    name: "Studio Cabinet Desk",
    monthlyPrice: 90000,
    style: "Oak top, white drawer cabinet",
    visual: "studio",
    modelPath: "/3d/desk-studio.glb",
  },
  {
    id: "desk-White-panel",
    category: "desk",
    name: "White Panel Desk",
    monthlyPrice: 100000,
    style: "White solid panel, modern minimalist",
    visual: "white",
    modelPath: "/3d/desk-white.glb",
  },
];

export const chairs: CatalogItem[] = [
  {
    id: "chair-white-executive",
    category: "chair",
    name: "White Executive Chair",
    monthlyPrice: 100000,
    style: "High-back support, plush seat",
    visual: "white",
    modelPath: "/3d/chair-c.glb",
  },
  {
    id: "chair-cloud-ergonomic",
    category: "chair",
    name: "Cloud Ergonomic Chair",
    monthlyPrice: 115000,
    style: "Breathable mesh, lumbar support",
    visual: "cloud",
    modelPath: "/3d/chair-a.glb",
  },
  {
    id: "chair-sprint-task",
    category: "chair",
    name: "Sprint Task Chair",
    monthlyPrice: 120000,
    style: "Compact frame, agile base",
    visual: "sprint",
    modelPath: "/3d/chair-b.glb",
  },
];

export const accessories: CatalogItem[] = [
  {
    id: "accessory-monitor-27inch",
    category: "accessory",
    name: '27" 4K Monitor',
    monthlyPrice: 190000,
    style: "Crisp IPS display",
    visual: "monitor-27",
    modelPath: "/3d/xiaomi_4k_27_monitor.glb",
  },
  {
    id: "accessory-monitor-ultrawide",
    category: "accessory",
    name: "Ultrawide Monitor",
    monthlyPrice: 240000,
    style: "Extra horizontal workspace",
    visual: "monitor-ultrawide",
    modelPath: "/3d/ultra-wide_monitor.glb",
  },
  {
    id: "accessory-lamp-focus",
    category: "accessory",
    name: "Focus Desk Lamp",
    monthlyPrice: 20000,
    style: "Directional warm light",
    visual: "lamp",
    modelPath: "/3d/desk-lamp.glb",
  },
  {
    id: "accessory-plant-zen",
    category: "accessory",
    name: "Zen Desk Plant",
    monthlyPrice: 5000,
    style: "Low-maintenance greenery",
    visual: "plant",
    modelPath: "/3d/desk-plant.glb",
  },
];

export const defaultDeskId = desks[0].id;
export const defaultChairId = chairs[0].id;

const allItems: CatalogItem[] = [...desks, ...chairs, ...accessories];

export const getItemById = (id: string): CatalogItem | undefined =>
  allItems.find((item) => item.id === id);

export const isMonitorItem = (item: CatalogItem): boolean => item.visual.startsWith("monitor");

export const getMonitorItems = (): CatalogItem[] => accessories.filter(isMonitorItem);

export const getNonMonitorItems = (): CatalogItem[] =>
  accessories.filter((item) => !isMonitorItem(item));
