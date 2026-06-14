import { adminDb } from "@/lib/firebase-admin";
import { Materials } from "@/lib/types";

export async function getMaterials(): Promise<Materials[]> {
    const snapshot = await adminDb
        .collection("materials")
        .orderBy("name", "asc")
        .get();

    return snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
            uuid: doc.id,
            id: data.id,
            dateCreated: data.date_created.toDate().toISOString(),
            dateModified: data.date_modified.toDate().toISOString(),
            name: data.name,
        };
    });
}