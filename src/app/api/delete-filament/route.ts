import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const filamentId = body.filamentId;
        const notes = body.notes ?? "Archived spool";

        if (!filamentId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Filament ID is required",
                },
                { status: 400 }
            );
        }

        const filamentRef = adminDb
            .collection("filament")
            .doc(filamentId);

        const snapshot = await filamentRef.get();

        if (!snapshot.exists) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Filament not found",
                },
                { status: 404 }
            );
        }

        const now = FieldValue.serverTimestamp();

        await filamentRef.update({
            status: "archived",
            date_modified: now,
        });

        await filamentRef
            .collection("scan_history")
            .doc(new Date().toISOString())
            .set({
                action: "removed",
                notes,
                date_created: now,
                date_modified: now,
            });

        return NextResponse.json({
            success: true,
            filamentId,
            status: "archived",
        });
    } catch (error) {
        console.error("Error archiving filament:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to archive filament",
            },
            { status: 500 }
        );
    }
}