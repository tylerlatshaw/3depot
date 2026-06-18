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
    if (percentRemaining >= 40) return "foreground";
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

export function adjustColor(
    hex: string,
    amount: number
) {
    const color = hex.replace("#", "");

    const num = parseInt(color, 16);

    const r = Math.min(
        255,
        Math.max(0, (num >> 16) + amount)
    );

    const g = Math.min(
        255,
        Math.max(0, ((num >> 8) & 0xff) + amount)
    );

    const b = Math.min(
        255,
        Math.max(0, (num & 0xff) + amount)
    );

    return `rgb(${r}, ${g}, ${b})`;
}

export function getFilamentSwatchStyle(
    colorCode: string,
    tags: string[]
) {
    const tagNames = tags.map((tag) =>
        tag.toLowerCase()
    );

    const isMetal = tagNames.includes("metal");
    const isSilk = tagNames.includes("silk");

    if (isMetal) {
        return {
            background: `
                linear-gradient(
                    135deg,
                    transparent 0%,
                    transparent 35%,
                    ${adjustColor(colorCode, 45)} 45%,
                    ${adjustColor(colorCode, 65)} 50%,
                    ${adjustColor(colorCode, 45)} 55%,
                    transparent 65%,
                    transparent 100%
                ),
                linear-gradient(
                    135deg,
                    ${adjustColor(colorCode, 25)} 0%,
                    ${adjustColor(colorCode, 10)} 25%,
                    ${colorCode} 50%,
                    ${adjustColor(colorCode, -15)} 75%,
                    ${adjustColor(colorCode, -30)} 100%
                )
            `,
                boxShadow: `
                inset 0 1px 2px rgba(255,255,255,.15),
                inset 0 -2px 4px rgba(0,0,0,.15)
            `,
        };
    }

    if (isSilk) {
        return {
            background: `
                radial-gradient(
                    circle at 28% 25%,
                    ${adjustColor(colorCode, 75)} 0%,
                    ${adjustColor(colorCode, 30)} 20%,
                    transparent 62%
                ),
                linear-gradient(
                    145deg,
                    ${adjustColor(colorCode, 35)} 0%,
                    ${colorCode} 45%,
                    ${adjustColor(colorCode, -35)} 100%
                )
            `,
            boxShadow: `
                inset 0 2px 4px ${adjustColor(colorCode, 35)},
                inset 0 -2px 5px ${adjustColor(colorCode, -35)}
            `,
        };
    }

    return {
        backgroundColor: colorCode,
    };
}