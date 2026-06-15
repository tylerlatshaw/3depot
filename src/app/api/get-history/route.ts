import { FilamentHistory } from "@/lib/types";
import { protectRoute } from "@/lib/auth/protect-route";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {

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
        const snapshot = await adminDb
            .collection("filament")
            .orderBy("brand", "asc")
            .orderBy("color", "asc")
            .get();

        const history: FilamentHistory[] = await Promise.all(
            snapshot.docs.map(async (doc) => {
                const data = doc.data();

                const scanHistorySnapshot = await doc.ref
                    .collection("scan_history")
                    .orderBy("date_created", "desc")
                    .get();

                const scanHistory = scanHistorySnapshot.docs.map((scanDoc) => {
                    const scanData = scanDoc.data();

                    return {
                        id: scanDoc.id,
                        dateCreated: scanData.date_created?.toDate().toISOString(),
                        dateModified: scanData.date_modified?.toDate().toISOString(),
                        action: scanData.action,
                        weight: scanData.weight,
                        notes: scanData.notes ?? "",
                    };
                });

                return {
                    filamentId: data.id,
                    scanHistory,
                };
            })
        );

        return NextResponse.json({
            success: true,
            data: history,
        });
    } catch (error) {
        console.error("Error fetching filament history:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch filament history",
            },
            { status: 500 }
        );
    }
}