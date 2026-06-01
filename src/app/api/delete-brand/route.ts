import { protectRoute } from "@/lib/auth/protect-route";
import { firestore } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
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
        const { uuid } = await request.json();

        if (!uuid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Brand UUID required",
                },
                { status: 400 }
            );
        }

        await firestore()
            .collection("brands")
            .doc(uuid)
            .delete();

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error("Error deleting brand:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete brand",
            },
            { status: 500 }
        );
    }
}