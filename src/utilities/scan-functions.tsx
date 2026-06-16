import { SanitizedFilamentIdResult } from "@/lib/types";

export function sanitizeFilamentId(
    value: string
): SanitizedFilamentIdResult {
    let cleaned = value
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "");

    // Auto-format common inputs without dashes
    if (!cleaned.includes("-")) {
        if (cleaned.length === 4) {
            cleaned = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
        } else if (cleaned.length === 8) {
            cleaned = `${cleaned.slice(0, 2)}-${cleaned.slice(
                2,
                4
            )}-${cleaned.slice(4)}`;
        }
    }

    const isValid =
        /^[A-Z0-9]{2,4}(?:-[A-Z0-9]{2,4})*$/.test(cleaned);

    if (!isValid) {
        return {
            success: false,
            error: "Invalid filament ID format",
        };
    }

    return {
        success: true,
        value: cleaned,
    };
}