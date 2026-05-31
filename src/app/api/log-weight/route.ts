import { firestore } from "firebase-admin";
import { NextResponse } from "next/server";

function getFilamentStatus(percentRemaining: number) {
    if (percentRemaining >= 40) return "in stock";
    if (percentRemaining >= 20) return "low stock";
    return "empty";
}

export async function POST(request: Request) {
    try {
        const { filamentId, updatedWeight, notes } = await request.json();

        if (!filamentId || typeof updatedWeight !== "number") {
            return NextResponse.json(
                {
                    success: false,
                    error: "filamentId and updatedWeight are required",
                },
                { status: 400 }
            );
        }

        const db = firestore();

        const filamentRef = db
            .collection("filament")
            .doc(filamentId);

        const filamentDoc = await filamentRef.get();

        if (!filamentDoc.exists) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Filament not found",
                },
                { status: 404 }
            );
        }

        const data = filamentDoc.data();

        const startingWeight = data?.starting_weight ?? 0;

        if (startingWeight <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid starting weight",
                },
                { status: 400 }
            );
        }

        const rawPercent =
            (updatedWeight / startingWeight) * 100;

        const percentRemaining = Math.min(
            100,
            Math.max(0, rawPercent)
        );

        const status = getFilamentStatus(percentRemaining);

        const now = firestore.FieldValue.serverTimestamp();

        const historyId = new Date().toISOString();

        const historyRef = filamentRef
            .collection("scan_history")
            .doc(historyId);

        const batch = db.batch();

        batch.update(filamentRef, {
            remaining_weight: updatedWeight,
            percent_remaining: percentRemaining,
            status,
            last_scanned: now,
            date_modified: now,
        });

        batch.set(historyRef, {
            action: "log weight",
            weight: updatedWeight,
            notes: notes ?? "",
            date_created: now,
            date_modified: now,
        });

        await batch.commit();

        return NextResponse.json({
            success: true,
            data: {
                filamentId,
                historyId: historyRef.id,
                remainingWeight: updatedWeight,
                percentRemaining,
                status,
            },
        });
    } catch (error) {
        console.error("Error logging weight:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to log weight",
            },
            { status: 500 }
        );
    }
}