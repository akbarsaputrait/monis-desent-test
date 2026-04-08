import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const selectionBorderClasses = (active: boolean) =>
  active ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40";
