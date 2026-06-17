import { NextRequest, NextResponse } from "next/server";
import { protectRoute } from "@/lib/auth/protect-route";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

function getFilamentStatus(percentRemaining: number) {
    if (percentRemaining >= 40) return "in stock";
    if (percentRemaining >= 20) return "low stock";
    return "empty";
}

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
        const {
            filamentId,
            currentWeight,
            notes,
        } = await request.json();

        if (!filamentId || typeof currentWeight !== "number") {
            return NextResponse.json(
                {
                    success: false,
                    error: "filamentId and currentWeight are required",
                },
                { status: 400 }
            );
        }

        const filamentRef = adminDb
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
        const spoolWeight = data?.spool_weight ?? 0;

        if (startingWeight <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid starting weight",
                },
                { status: 400 }
            );
        }

        if (spoolWeight < 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid spool weight",
                },
                { status: 400 }
            );
        }

        if (spoolWeight > startingWeight) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Spool weight cannot exceed starting weight",
                },
                { status: 400 }
            );
        }

        if (currentWeight < spoolWeight) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Current scale weight cannot be less than spool weight",
                },
                { status: 400 }
            );
        }

        if (currentWeight > startingWeight) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Current scale weight cannot exceed starting weight",
                },
                { status: 400 }
            );
        }

        const originalFilamentWeight = Math.max(
            startingWeight - spoolWeight,
            0
        );

        const remainingWeight = Math.max(
            currentWeight - spoolWeight,
            0
        );

        const rawPercent =
            originalFilamentWeight > 0
                ? (remainingWeight / originalFilamentWeight) * 100
                : 0;

        const percentRemaining = Math.min(
            100,
            Math.max(0, rawPercent)
        );

        const status = getFilamentStatus(percentRemaining);

        const now = FieldValue.serverTimestamp();

        const historyId = new Date().toISOString();

        const historyRef = filamentRef
            .collection("scan_history")
            .doc(historyId);

        const batch = adminDb.batch();

        batch.update(filamentRef, {
            current_weight: currentWeight,
            remaining_weight: remainingWeight,
            percent_remaining: percentRemaining,
            status,
            last_scanned: now,
            date_modified: now,
        });

        batch.set(historyRef, {
            action: "log weight",
            current_weight: currentWeight,
            remaining_weight: remainingWeight,
            percent_remaining: percentRemaining,
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
                currentWeight,
                remainingWeight,
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