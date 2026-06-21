import { adminDb } from "@/lib/firebase-admin";
import { FilamentWithHistory } from "@/lib/types";

export async function getFilamentWithHistory(): Promise<FilamentWithHistory[]> {
    const snapshot = await adminDb
        .collection("filament")
        .orderBy("brand", "asc")
        .orderBy("color", "asc")
        .get();

    const filament: FilamentWithHistory[] = await Promise.all(
        snapshot.docs.map(async (doc) => {
            const data = doc.data();

            const remainingWeight = data.remaining_weight ?? 0;
            const spoolWeight = data.spool_weight ?? 0;

            const currentWeight =
                data.current_weight ?? remainingWeight + spoolWeight;

            const scanHistorySnapshot = await doc.ref
                .collection("scan_history")
                .orderBy("date_created", "desc")
                .get();

            const scanHistory = scanHistorySnapshot.docs.map((scanDoc) => {
                const scanData = scanDoc.data();

                return {
                    id: scanDoc.id,
                    dateCreated:
                        scanData.date_created?.toDate().toISOString() ?? "",
                    dateModified:
                        scanData.date_modified?.toDate().toISOString() ?? "",
                    action: scanData.action,
                    weight: scanData.weight,
                    notes: scanData.notes ?? "",
                };
            });

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

                datePurchased:
                    typeof data.date_purchased === "string"
                        ? data.date_purchased
                        : "",

                scanHistory,

                swatch: data.swatch,
                swatchImageUrl: data.swatch_image_url,
                notes: data.notes ?? "",

                dateCreated:
                    data.date_created?.toDate().toISOString() ?? "",

                dateModified:
                    data.date_modified?.toDate().toISOString() ?? "",
            };
        })
    );

    return filament;
}