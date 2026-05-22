import { SanitizedFilamentIdResult } from "@/lib/types";

export function sanitizeFilamentId(
    value: string
): SanitizedFilamentIdResult {
    const cleaned = value
        .trim()
        .toUpperCase();

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