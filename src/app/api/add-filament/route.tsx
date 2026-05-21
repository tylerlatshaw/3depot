import { firestore } from "firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const filament = await request.json();

        if (!filament.id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Filament id is required",
                },
                { status: 400 }
            );
        }

        const docRef = firestore()
            .collection("filament")
            .doc(filament.id);

        const existingDoc = await docRef.get();

        const wasInserted = !existingDoc.exists;
        const operation = wasInserted
            ? "inserted"
            : "upserted";

        const now = firestore.FieldValue.serverTimestamp();

        await docRef.set(
            {
                id: filament.id,

                brand: filament.brand,
                color: filament.color,
                color_code: filament.colorCode,
                tags: filament.tags ?? [],
                material: filament.material,

                status: filament.status,
                percent_remaining: filament.percentRemaining,
                remaining_weight: filament.remainingWeight,
                starting_weight: filament.startingWeight,
                spool_weight: filament.spoolWeight,

                last_scanned: filament.lastScanned
                    ? firestore.Timestamp.fromDate(
                        new Date(filament.lastScanned)
                    )
                    : now,

                swatch: filament.swatch ?? false,
                notes: filament.notes ?? "",

                date_created: wasInserted
                    ? now
                    : existingDoc.data()?.date_created,

                date_modified: now,
            },
            {
                merge: true,
            }
        );

        return NextResponse.json({
            success: true,
            operation,
            id: filament.id,
        });

    } catch (error) {

        console.error(
            "Error upserting filament:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error: "Failed to upsert filament",
            },
            {
                status: 500,
            }
        );
    }
}