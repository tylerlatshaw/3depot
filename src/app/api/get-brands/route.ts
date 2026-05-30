import { Brands } from "@/lib/types";
import { firestore } from "firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const snapshot = await firestore()
            .collection("brands")
            .orderBy("name", "asc")
            .get();

        const brands: Brands[] = snapshot.docs.map((doc) => {

            const data = doc.data();

            return {
                uuid: doc.id,
                id: data.id,
                dateCreated: data.date_created.toDate().toISOString(),
                dateModified: data.date_modified.toDate().toISOString(),
                name: data.name,
                spoolWeight: data.spool_weight,
                brandColor: data.brand_color
            };
        });

        return NextResponse.json({
            success: true,
            data: brands,
        });


    } catch (error) {

        console.error("Error fetching brand data:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch brand data",
            },
            {
                status: 500,
            }
        );
    }
}