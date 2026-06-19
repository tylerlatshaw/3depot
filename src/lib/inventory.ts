import { InventorySection } from "./types";

export const inventorySections: InventorySection[] = [
    {
        title: "PLA",
        criteria: {
            material: "PLA",
            tags: [
                "Basic",
                "Matte",
                "Silk",
                "Metal"
            ],
        },
    },
    {
        title: "Specialty PLA",
        criteria: {
            material: "PLA",
            tags: [
                "Glow in the Dark",
                "Clear",
                "Translucent",
                "Dual Color",
                "Tri Color",
                "Gradient",
                "Marble",
                "Temperature Changing",
            ],
        },
    },
    {
        title: "PETG",
        criteria: {
            material: "PETG",
        },
    },
];