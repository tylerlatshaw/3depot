import { adminDb } from "@/lib/firebase-admin";
import { Filament } from "@/lib/types";

export async function getFilament(): Promise<Filament[]> {
    const snapshot = await adminDb
        .collection("filament")
        .orderBy("brand", "asc")
        .orderBy("color", "asc")
        .get();

    return snapshot.docs.map((doc) => {
        const data = doc.data();

        const remainingWeight = data.remaining_weight ?? 0;
        const spoolWeight = data.spool_weight ?? 0;

        const currentWeight =
            data.current_weight ?? remainingWeight + spoolWeight;

        return {
            uuid: doc.id,
            id: data.id,

            brand: data.brand,
            color: data.color,
            colorCode: data.color_code,
            colorCodes: data.color_codes ?? [],
            tags: data.tags ?? [],
            material: data.material,

            status: data.status,
            percentRemaining: data.percent_remaining,
            remainingWeight,
            currentWeight,
            startingWeight: data.starting_weight,
            spoolWeight,
            lastScanned:
                data.last_scanned?.toDate().toISOString() ?? "",
            datePurchased: data.date_purchased
                ? data.date_purchased.toDate().toISOString()
                : undefined,

            swatch: data.swatch,
            swatchImageUrl: data.swatch_image_url,
            notes: data.notes ?? "",

            dateCreated:
                data.date_created?.toDate().toISOString() ?? "",
            dateModified:
                data.date_modified?.toDate().toISOString() ?? "",
        };
    });
}