import { firestore } from "firebase-admin";
import { protectRoute } from "@/lib/auth/protect-route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    if (!(await protectRoute(request))) {
        return NextResponse.json(
            {
                success: false,
                error: "Unauthorized",
            },
            { status: 401 }
        );
    }

    try {
        const material = await request.json();

        if (!material.id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Material id is required",
                },
                { status: 400 }
            );
        }

        const collection = firestore().collection("materials");

        // Existing row edit = use existing UUID
        // New row insert = generate UUID
        const docRef = material.uuid
            ? collection.doc(material.uuid)
            : collection.doc();

        const existingDoc = await docRef.get();

        const wasInserted = !existingDoc.exists;

        const now = firestore.FieldValue.serverTimestamp();

        await docRef.set(
            {
                id: material.id,
                name: material.name ?? "",
                date_created: wasInserted
                    ? now
                    : existingDoc.data()
                        ?.date_created ?? now,

                date_modified: now,
            },
            {
                merge: true,
            }
        );

        return NextResponse.json({
            success: true,
            operation: wasInserted
                ? "inserted"
                : "upserted",

            uuid: docRef.id,
            id: material.id,
        });
    } catch (error) {
        console.error(
            "Error upserting material:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error: "Failed to upsert material",
            },
            { status: 500 }
        );
    }
}