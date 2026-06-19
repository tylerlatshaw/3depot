import { Filament, InventorySection } from "@/lib/types";

export function matchesInventorySection(
    filament: Filament,
    section: InventorySection
) {
    const materialMatches =
        !section.criteria.material ||
        filament.material?.toLowerCase() ===
        section.criteria.material.toLowerCase();

    const tagMatches =
        !section.criteria.tags?.length ||
        section.criteria.tags.some((tag) =>
            filament.tags.some(
                (filamentTag) =>
                    filamentTag.toLowerCase() === tag.toLowerCase()
            )
        );

    return materialMatches && tagMatches;
}