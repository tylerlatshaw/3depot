import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import {
    serializeFirestoreData,
    verifyTransferApiKey,
    type FirestoreTransferPayload,
} from "@/lib/firestore-transfer";

async function exportSimpleCollection(collectionName: string) {
    const snapshot = await adminDb.collection(collectionName).get();

    return Object.fromEntries(
        snapshot.docs.map((doc) => [
            doc.id,
            serializeFirestoreData(doc.data()),
        ])
    );
}

async function exportFilamentCollection() {
    const snapshot = await adminDb.collection("filament").get();

    const filamentEntries = await Promise.all(
        snapshot.docs.map(async (doc) => {
            const scanHistorySnapshot = await doc.ref
                .collection("scan_history")
                .get();

            const scanHistory = Object.fromEntries(
                scanHistorySnapshot.docs.map((scanDoc) => [
                    scanDoc.id,
                    serializeFirestoreData(scanDoc.data()),
                ])
            );

            return [
                doc.id,
                {
                    data: serializeFirestoreData(doc.data()),
                    scan_history: scanHistory,
                },
            ] as const;
        })
    );

    return Object.fromEntries(filamentEntries);
}

export async function GET(request: NextRequest) {
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
        const payload: FirestoreTransferPayload = {
            exportedAt: new Date().toISOString(),
            collections: {
                filament: await exportFilamentCollection(),
                materials: await exportSimpleCollection("materials"),
                brands: await exportSimpleCollection("brands"),
                contact_messages: await exportSimpleCollection(
                    "contact_messages"
                ),
            },
        };

        return NextResponse.json({
            success: true,
            data: payload,
        });
    } catch (error) {
        console.error("Error exporting Firestore:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to export Firestore",
            },
            { status: 500 }
        );
    }
}