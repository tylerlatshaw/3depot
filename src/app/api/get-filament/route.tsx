import { Filament } from "@/lib/types";
import { firestore } from "firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const snapshot = await firestore()
            .collection("filament")
            .orderBy("brand", "asc")
            .orderBy("color", "asc")
            .get();

        const filament: Filament[] = snapshot.docs.map((doc) => {

            const data = doc.data();

            return {
                uuid: doc.id,
                id: data.id,

                brand: data.brand,
                color: data.color,
                colorCode: data.color_code,
                tags: data.tags ?? [],
                material: data.material,

                status: data.status,
                percentRemaining: data.percent_remaining,
                remainingWeight: data.remaining_weight,
                startingWeight: data.starting_weight,
                spoolWeight: data.spool_weight,
                lastScanned: data.last_scanned.toDate().toISOString(),
                datePurchased: data.date_purchased ? data.date_purchased.toDate().toISOString() : undefined,

                swatch: data.swatch,
                swatchImageUrl: data.swatch_image_url,
                notes: data.notes ?? "",

                dateCreated: data.date_created.toDate().toISOString(),
                dateModified: data.date_modified.toDate().toISOString(),
            };
        });

        return NextResponse.json({
            success: true,
            data: filament,
        });


    } catch (error) {

        console.error("Error fetching filament data:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch filament data",
            },
            {
                status: 500,
            }
        );
    }
}