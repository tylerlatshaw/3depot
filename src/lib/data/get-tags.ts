import { adminDb } from "@/lib/firebase-admin";

export async function getTags(): Promise<string[]> {
    const snapshot = await adminDb
        .collection("filament")
        .get();

    const tags = snapshot.docs.flatMap((doc) => {
        const data = doc.data();

        return Array.isArray(data.tags) ? data.tags : [];
    });

    return Array.from(new Set(tags))
        .filter((tag): tag is string => typeof tag === "string" && tag.trim() !== "")
        .map((tag) => tag.trim())
        .sort((a, b) => a.localeCompare(b));
}