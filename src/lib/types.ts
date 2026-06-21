import { type LucideProps } from "lucide-react";

export type Links = {
    name: string;
    shortName: string;
    href: string;
    icon?: React.FC<LucideProps>;
};

export const FILAMENT_STATUS = {
    IN_STOCK: "in stock",
    LOW_STOCK: "low stock",
    EMPTY: "empty",
    DISCARDED: "discarded",
    ARCHIVED: "archived",
} as const;

export type FilamentStatus =
    (typeof FILAMENT_STATUS)[keyof typeof FILAMENT_STATUS];

export const FILAMENT_STATUS_ORDER: FilamentStatus[] = [
    FILAMENT_STATUS.IN_STOCK,
    FILAMENT_STATUS.LOW_STOCK,
    FILAMENT_STATUS.EMPTY,
    FILAMENT_STATUS.DISCARDED,
    FILAMENT_STATUS.ARCHIVED,
];

export type ScanActions =
    | "created"
    | "log weight"
    | "change info"
    | "removed";

export type FilamentHistoryItem = {
    id: string;
    dateCreated: string;
    dateModified: string;
    action: ScanActions;
    weight?: number;
    notes?: string;
};

export type FilamentHistory = {
    filamentId: Filament["id"];
    scanHistory: FilamentHistoryItem[];
};

export type FilamentHistoryFlattened = {
    filamentId: Filament["id"];
    historyId: string;
    dateCreated: string;
    dateModified: string;
    action: ScanActions;
    weight?: number;
    notes?: string;
};

export type Filament = {
    uuid: string;
    id: string;

    brand: string;
    color: string;
    colorCode: string; // primary/fallback color
    colorCodes?: string[]; // optional multi-color override
    tags: string[];
    material: string;

    status: FilamentStatus;
    percentRemaining: number; // calculated percentage
    remainingWeight: number; // calculated filament only
    currentWeight: number; // current raw scale weight
    startingWeight: number; // filament and spool weight starting e.g. 1000 + 200 for spool
    spoolWeight: number; // empty spool only
    lastScanned: string;
    datePurchased?: string;

    swatch: boolean;
    swatchImageUrl?: string;
    notes?: string;

    dateCreated: string;
    dateModified: string;
};

export type FilamentWithHistory = Filament & {
    scanHistory: FilamentHistoryItem[];
};

export type SanitizedFilamentIdResult =
    | {
        success: true;
        value: string;
    }
    | {
        success: false;
        error: string;
    };

export type EntryFormatOptions =
    | "camera"
    | "manual";

export type EntryModeOptions =
    | "entry"
    | "matched"
    | "unmatched";


export type FormActions = "logweight" | "changeinfo" | "history" | "archive";

export type Brands = {
    uuid: string;
    id: string;
    dateCreated: string;
    dateModified: string;
    name: string;
    spoolWeight: number;
    brandColor: string
};

export type Materials = {
    uuid: string;
    id: string;
    dateCreated: string;
    dateModified: string;
    name: string;
}

export type PolicySection = {
    title: string;
    details: {
        header?: string;
        text: string;
    }[];
}

export type InventorySection = {
    title: string;
    criteria: {
        material?: string;
        tags?: string[];
    };
};

export type ColorGroup =
    | "Multicolor"
    | "Translucent"
    | "Black"
    | "White"
    | "Gray"
    | "Red"
    | "Orange"
    | "Yellow"
    | "Green"
    | "Blue"
    | "Purple"
    | "Pink"
    | "Brown";