import { Materials } from "@/lib/types";
import { firestore } from "firebase-admin";
import { protectRoute } from "@/lib/auth/protect-route";
import { NextRequest, NextResponse } from "next/server";

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
        const snapshot = await firestore()
            .collection("materials")
            .orderBy("name", "asc")
            .get();

        const brands: Materials[] = snapshot.docs.map((doc) => {

            const data = doc.data();

            return {
                uuid: doc.id,
                id: data.id,
                dateCreated: data.date_created.toDate().toISOString(),
                dateModified: data.date_modified.toDate().toISOString(),
                name: data.name,
            };
        });

        return NextResponse.json({
            success: true,
            data: brands,
        });


    } catch (error) {

        console.error("Error fetching material data:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch material data",
            },
            {
                status: 500,
            }
        );
    }
}