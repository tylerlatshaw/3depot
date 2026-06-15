import { protectRoute } from "@/lib/auth/protect-route";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

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
        const brand = await request.json();

        if (!brand.id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Brand id is required",
                },
                { status: 400 }
            );
        }

        const collection = adminDb.collection("brands");

        // Existing row edit = use existing UUID
        // New row insert = generate UUID
        const docRef = brand.uuid
            ? collection.doc(brand.uuid)
            : collection.doc();

        const existingDoc = await docRef.get();

        const wasInserted = !existingDoc.exists;

        const now = FieldValue.serverTimestamp();

        await docRef.set(
            {
                id: brand.id,
                name: brand.name ?? "",
                spool_weight: Number(
                    brand.spoolWeight ?? 0
                ),
                brand_color:
                    brand.brandColor ?? "#000000",

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
            id: brand.id,
        });
    } catch (error) {
        console.error(
            "Error upserting brand:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error: "Failed to upsert brand",
            },
            { status: 500 }
        );
    }
}