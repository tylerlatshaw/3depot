import {
    FilamentHistoryFlattened,
    FilamentWithHistory,
} from "@/lib/types";

export function flattenFilamentHistory(
    history: FilamentWithHistory[]
): FilamentHistoryFlattened[] {
    return history.flatMap((filament) =>
        filament.scanHistory.map((scan) => ({
            filamentId: filament.id,
            historyId: scan.id,
            dateCreated: scan.dateCreated,
            dateModified: scan.dateModified,
            action: scan.action,
            weight: scan.weight,
            notes: scan.notes,
        }))
    );
}