import { ChipVariantProps } from "@/components/ui/chip";
import { FILAMENT_COLORS } from "@/lib/colors";
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

export function getColorCodeFromName(
    colorName: string
): string | null {
    return (
        FILAMENT_COLORS[
        colorName.trim().toLowerCase()
        ] ?? null
    );
}

function buildMarbleTexture(colorCode: string) {
    const vein = adjustColor(colorCode, -90);

    const svg = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
            <path d="M-10 58 C 8 44, 22 52, 38 34 S 62 16, 90 8"
                fill="none"
                stroke="${vein}"
                stroke-width="5"
                stroke-linecap="round"
                opacity="0.25"
            />
            <path d="M-8 24 C 14 34, 28 18, 46 28 S 66 52, 92 38"
                fill="none"
                stroke="${vein}"
                stroke-width="3"
                stroke-linecap="round"
                opacity="0.20"
            />
            <path d="M20 90 C 28 66, 42 60, 50 40 S 56 16, 78 -8"
                fill="none"
                stroke="${vein}"
                stroke-width="3"
                stroke-linecap="round"
                opacity="0.30"
            />
        </svg>
    `);

    return {
        backgroundColor: colorCode,
        backgroundImage: `
            url("data:image/svg+xml,${svg}"),
            linear-gradient(
                135deg,
                ${adjustColor(colorCode, 20)} 0%,
                ${colorCode} 50%,
                ${adjustColor(colorCode, -15)} 100%
            )
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
}

function buildGradient(colors: string[]) {
    const stops = colors.map((color, index) => {
        const percent =
            (index / (colors.length - 1)) * 90;

        return `${color} ${percent}%`;
    });

    return `
        linear-gradient(
            135deg,
            ${stops.join(",")}
        )
    `;
}

export function getFilamentSwatchStyle(
    color: string,
    colorCode: string,
    colorCodes: string[] = [],
    tags: string[],
) {
    const normalizedTags = tags.map((tag) =>
        tag.trim().toLowerCase()
    );

    const isMetal = normalizedTags.some((tag) =>
        tag.includes("metal")
    );

    const isSilk = normalizedTags.some((tag) =>
        tag.includes("silk")
    );

    const isDualColor = normalizedTags.some((tag) =>
        tag.includes("dual color")
    );

    const isTriColor = normalizedTags.some((tag) =>
        tag.includes("tri color")
    );

    const isGlow = normalizedTags.some((tag) =>
        tag.includes("glow")
    );

    const isRainbow = color.toLowerCase().includes("rainbow") || normalizedTags.some((tag) =>
        tag.includes("rainbow")
    );

    const isMarble = normalizedTags.some((tag) =>
        tag.includes("marble")
    );

    const isTransparent = normalizedTags.some((tag) =>
        tag.includes("translucent") || tag.includes("clear") || tag.includes("transparent")
    );

    const isTemperature = normalizedTags.some((tag) =>
        tag.includes("temperature")
    );

    const isWood = normalizedTags.some((tag) =>
        tag.includes("wood")
    );

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

    if (isDualColor) {
        const colors = colorCodes.length >= 2
            ? colorCodes
            : color!
                .split("/")
                .map((part) =>
                    getColorCodeFromName(part)
                )
                .filter(Boolean);

        return {
            background: `
                linear-gradient(
                    135deg,
                    ${adjustColor(colors[0]!, 0)} 50%,
                    ${adjustColor(colors[1]!, 0)} 50%
                )
            `
        };
    }

    if (isTriColor) {
        const colors = colorCodes.length >= 3
            ? colorCodes
            : color!
                .split("/")
                .map((part) =>
                    getColorCodeFromName(part)
                )
                .filter(Boolean);

        return {
            background: `
                conic-gradient(
                    ${colors[1]} 0deg 120deg,
                    ${colors[2]} 120deg 240deg,
                    ${colors[0]} 240deg 360deg
                )
            `
        };
    }

    if (isGlow) {
        return {
            backgroundColor: colorCode,
            boxShadow: `
                0 0 12px ${adjustColor(colorCode, 20)}
        `,
        };
    }

    if (isRainbow) {
        const colors =
            colorCodes?.length > 0
                ? colorCodes
                : [
                    "#ff0080",
                    "#ff8000",
                    "#ffff00",
                    "#00ff80",
                    "#0080ff",
                    "#8000ff",
                ];

        return {
            background: `
                linear-gradient(
                    135deg,
                    transparent 0%,
                    rgba(255,255,255,.35) 45%,
                    rgba(255,255,255,.6) 50%,
                    rgba(255,255,255,.35) 55%,
                    transparent 100%
                ),
            ${buildGradient(colors)}
        `
        };
    }

    if (isMarble) {
        return buildMarbleTexture(colorCode);
    }

    if (isTransparent) {
        return {
            background: `
                linear-gradient(
                    135deg,
                    rgba(255,255,255,.55) 0%,
                    ${colorCode}55 40%,
                    ${colorCode}33 100%
                )
            `,
            border: "1px solid rgba(255,255,255,.25)",
            boxShadow: `
                inset 0 2px 4px rgba(255,255,255,.4),
                inset 0 -2px 4px rgba(0,0,0,.08)
            `,
            opacity: 0.85,
        };
    }

    if (isTemperature) {
        if (colorCodes.length >= 2) {
            return {
                background: `
                    linear-gradient(
                        90deg,
                        rgba(255,255,255,.25) 0%,
                        transparent 50%,
                        rgba(255,255,255,.25) 100%
                    ),
                    linear-gradient(
                        135deg,
                        ${colorCodes[0]} 0%,
                        ${colorCodes[1]} 90%
                    )
                `
            };
        } else {
            return {
                background: `
                    linear-gradient(
                        90deg,
                        rgba(255,255,255,.25) 0%,
                        transparent 50%,
                        rgba(255,255,255,.25) 100%
                    ),
                    linear-gradient(
                        135deg,
                        ${colorCode} 0%,
                        ${adjustColor(colorCode, 215)} 100%
                    )
                `
            };
        }
    }

    if (isWood) {
        return {
            background: `
                repeating-linear-gradient(
                    88deg,
                    transparent 0px,
                    transparent 4px,
                    rgba(0,0,0,.08) 5px,
                    transparent 7px,
                    transparent 14px
                ),
                linear-gradient(
                    135deg,
                    ${adjustColor(colorCode, 12)} 0%,
                    ${colorCode} 50%,
                    ${adjustColor(colorCode, -15)} 100%
                )
            `,
            boxShadow: `
                inset 0 1px 2px rgba(255,255,255,.12),
                inset 0 -2px 3px rgba(0,0,0,.12)
            `,
        };
    }

    return {
        backgroundColor: colorCode,
    };
}

export function hexToHue(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    if (max === min) return 0;

    let hue = 0;

    switch (max) {
        case r:
            hue = ((g - b) / (max - min)) % 6;
            break;

        case g:
            hue = (b - r) / (max - min) + 2;
            break;

        case b:
            hue = (r - g) / (max - min) + 4;
            break;
    }

    return Math.round(hue * 60);
}