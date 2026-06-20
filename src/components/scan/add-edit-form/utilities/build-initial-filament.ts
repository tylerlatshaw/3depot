import { Filament } from "@/lib/types";
import dayjs from "dayjs";

export default function buildInitialFilament({
    newFilamentId,
    selectedFilament,
}: {
    newFilamentId?: string;
    selectedFilament?: Filament;
}): Partial<Filament> {
    if (selectedFilament) {
        return {
            ...selectedFilament,
            datePurchased: selectedFilament.datePurchased
                ? dayjs(
                    selectedFilament.datePurchased
                ).format("YYYY-MM-DD")
                : "",
        };
    }

    return {
        id: newFilamentId ?? "",

        brand: "",
        color: "",
        colorCode: "#00DDFF",
        colorCodes: [],
        tags: [],
        material: "",

        status: "in stock",

        percentRemaining: 100,

        startingWeight: 1000,
        spoolWeight: 0,
        currentWeight: 1000,
        remainingWeight: 1000,

        swatch: false,
        notes: "",

        datePurchased: dayjs().format(
            "YYYY-MM-DD"
        ),
    };
}