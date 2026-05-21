import { ChipVariantProps } from "@/components/ui/chip";
import { Filament, FilamentStatus } from "@/lib/types";

export function getContrastingColor(hex: string): string {
    const cleanHex = hex.replace("#", "");

    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);

    // Perceived brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? "#000000" : "#FFFFFF";
}

export function getStatusChipColor(status: FilamentStatus): ChipVariantProps["variant"] {
    switch (status) {
        case "in stock":
            return "success";
        case "low stock":
            return "warning";
        case "empty":
            return "danger";
        case "discarded":
            return "default";
        case "archived":
            return "default";
        default:
            return "default";
    }
};

export function getStatusTextColor(percentRemaining: Filament["percentRemaining"]) {
    if (percentRemaining >= 50) return "foreground";
    if (percentRemaining >= 20) return "warning";
    if (percentRemaining >= 0) return "danger";
    return "foreground";
};

export function hexToRgba(hex: string, alpha = 0.5) {
    const cleanHex = hex.replace("#", "");

    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}