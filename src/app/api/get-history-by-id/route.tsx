import { firestore } from "firebase-admin";
import { NextResponse } from "next/server";
import { FilamentHistoryItem } from "@/lib/types";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Filament ID is required",
                },
                { status: 400 }
            );
        }

        const snapshot = await firestore()
            .collection("filament")
            .doc(id)
            .collection("scan_history")
            .orderBy("date_created", "desc")
            .get();

        const history: FilamentHistoryItem[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                id: doc.id,
                dateCreated: data.date_created?.toDate().toISOString(),
                dateModified: data.date_modified?.toDate().toISOString(),
                action: data.action,
                weight: data.weight,
                notes: data.notes ?? "",
            };
        });

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