import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import {
    deserializeFirestoreData,
    verifyTransferApiKey,
    type FirestoreTransferPayload,
} from "@/lib/firestore-transfer";

const SIMPLE_COLLECTIONS = [
    "materials",
    "brands",
    "contact_messages",
] as const;

async function deleteCollection(collectionName: string) {
    const snapshot = await adminDb.collection(collectionName).get();

    await Promise.all(
        snapshot.docs.map((doc) =>
            adminDb.recursiveDelete(doc.ref)
        )
    );
}

async function importSimpleCollection(
    collectionName: string,
    documents: Record<string, Record<string, unknown>>
) {
    const entries = Object.entries(documents);

    for (let i = 0; i < entries.length; i += 400) {
        const batch = adminDb.batch();

        entries.slice(i, i + 400).forEach(([docId, data]) => {
            batch.set(
                adminDb.collection(collectionName).doc(docId),
                deserializeFirestoreData(data)
            );
        });

        await batch.commit();
    }
}

async function importFilamentCollection(
    filament: FirestoreTransferPayload["collections"]["filament"]
) {
    const entries = Object.entries(filament);

    for (let i = 0; i < entries.length; i += 400) {
        const batch = adminDb.batch();

        entries.slice(i, i + 400).forEach(([docId, value]) => {
            batch.set(
                adminDb.collection("filament").doc(docId),
                deserializeFirestoreData(value.data)
            );
        });

        await batch.commit();
    }

    for (const [docId, value] of entries) {
        const scanHistoryEntries = Object.entries(
            value.scan_history ?? {}
        );

        for (let i = 0; i < scanHistoryEntries.length; i += 400) {
            const batch = adminDb.batch();

            scanHistoryEntries
                .slice(i, i + 400)
                .forEach(([historyId, historyData]) => {
                    batch.set(
                        adminDb
                            .collection("filament")
                            .doc(docId)
                            .collection("scan_history")
                            .doc(historyId),
                        deserializeFirestoreData(historyData)
                    );
                });

            await batch.commit();
        }
    }
}

export async function POST(request: NextRequest) {
    if (process.env.ALLOW_FIRESTORE_IMPORT !== "true") {
        return NextResponse.json(
            {
                success: false,
                error: "Firestore import is disabled",
            },
            { status: 403 }
        );
    }

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            {
                success: false,
                error: "Firestore import cannot run in production",
            },
            { status: 403 }
        );
    }

    if (!verifyTransferApiKey(request)) {
        return NextResponse.json(
            {
                success: false,
                error: "Invalid API key",
            },
            { status: 401 }
        );
    }

    try {
        const payload = (await request.json()) as FirestoreTransferPayload;

        if (!payload?.collections?.filament) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid import payload",
                },
                { status: 400 }
            );
        }

        await deleteCollection("filament");

        for (const collectionName of SIMPLE_COLLECTIONS) {
            await deleteCollection(collectionName);
        }

        await importFilamentCollection(payload.collections.filament);

        for (const collectionName of SIMPLE_COLLECTIONS) {
            await importSimpleCollection(
                collectionName,
                payload.collections[collectionName] ?? {}
            );
        }

        return NextResponse.json({
            success: true,
            message: "Firestore import complete",
            importedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error importing Firestore:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to import Firestore",
            },
            { status: 500 }
        );
    }
}