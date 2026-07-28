import type { LucideIcon } from "lucide-react";
import { Lightbulb, Fan, Refrigerator, Tv, Router, Smartphone } from "lucide-react";

export type ApplianceId =
  | "light"
  | "fan"
  | "fridge"
  | "tv"
  | "wifiRouter"
  | "charging";

export interface Appliance {
  id: ApplianceId;
  label: string;
  /** Watts per unit — realistic Indian-household averages. [TODO: client to adjust for their actual product mix] */
  wattage: number;
  icon: LucideIcon;
  note?: string;
}

export type ApplianceQuantities = Record<ApplianceId, number>;

/** The 6 appliances shown in the hero calculator's 2x3 grid — all typically kept on backup. */
export const APPLIANCES: Appliance[] = [
  { id: "light", label: "LED / Tube Light", wattage: 15, icon: Lightbulb },
  { id: "fan", label: "Ceiling Fan", wattage: 75, icon: Fan },
  { id: "fridge", label: "Refrigerator", wattage: 150, icon: Refrigerator },
  { id: "tv", label: "TV", wattage: 100, icon: Tv },
  { id: "wifiRouter", label: "Wi-Fi Router", wattage: 10, icon: Router },
  { id: "charging", label: "Mobile / Laptop Charging", wattage: 65, icon: Smartphone },
];

export const ZERO_QUANTITIES: ApplianceQuantities = APPLIANCES.reduce(
  (acc, appliance) => ({ ...acc, [appliance.id]: 0 }),
  {} as ApplianceQuantities
);

/** Standard home inverter/battery system voltage assumption. */
export const SYSTEM_VOLTAGE = 12;

/** Accounts for inverter conversion losses — real-world backup is always less than the theoretical max. */
export const EFFICIENCY_FACTOR = 0.65;

/** Minimum backup hours a battery must clear to be marked "Recommended for you". Tune per client. */
export const TARGET_BACKUP_HOURS = 6;

export interface BatteryOption {
  ah: number;
  label: string;
  /** [TODO: confirm 150 AH price — the original brief's ₹1,85,000 is ~10x the other two and looks like a typo] */
  price: number;
}

export const BATTERY_OPTIONS: BatteryOption[] = [
  { ah: 100, label: "100 AH", price: 17000 },
  { ah: 150, label: "150 AH", price: 18500 },
  { ah: 200, label: "200 AH", price: 20000 },
];

export interface BatteryResult extends BatteryOption {
  backupHours: number;
  recommended: boolean;
}

export function calculateTotalWatts(quantities: ApplianceQuantities): number {
  return APPLIANCES.reduce(
    (sum, appliance) => sum + appliance.wattage * (quantities[appliance.id] || 0),
    0
  );
}

/** Backup Hours = (AH x Voltage x Efficiency Factor) / Total Watts. This is an estimate — see UI disclaimer. */
export function calculateBackupHours(totalWatts: number, ah: number): number {
  if (totalWatts <= 0) return 0;
  return (ah * SYSTEM_VOLTAGE * EFFICIENCY_FACTOR) / totalWatts;
}

/**
 * Computes backup hours for every battery option and marks the smallest one that clears
 * TARGET_BACKUP_HOURS as "recommended" (falling back to the largest option if none clear it).
 */
export function getBatteryResults(quantities: ApplianceQuantities): BatteryResult[] {
  const totalWatts = calculateTotalWatts(quantities);

  const results = BATTERY_OPTIONS.map((option) => ({
    ...option,
    backupHours: calculateBackupHours(totalWatts, option.ah),
  }));

  const meetsTarget = results.find((result) => result.backupHours >= TARGET_BACKUP_HOURS);
  const recommendedAh = (meetsTarget ?? results[results.length - 1]).ah;

  return results.map((result) => ({ ...result, recommended: result.ah === recommendedAh }));
}

export function hasAnyAppliance(quantities: ApplianceQuantities): boolean {
  return Object.values(quantities).some((quantity) => quantity > 0);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
