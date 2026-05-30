import { adminDb } from "@/lib/firebase-admin";
import { Brands } from "@/lib/types";

export async function getBrands(): Promise<Brands[]> {
    const snapshot = await adminDb
        .collection("brands")
        .orderBy("name", "asc")
        .get();

    return snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
            uuid: doc.id,
            id: data.id,
            dateCreated:
                data.date_created?.toDate().toISOString() ?? "",
            dateModified:
                data.date_modified?.toDate().toISOString() ?? "",
            name: data.name,
            spoolWeight: data.spool_weight,
            brandColor: data.brand_color,
        };
    });
}