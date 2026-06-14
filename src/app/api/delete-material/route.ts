import { firestore } from "firebase-admin";
import { protectRoute } from "@/lib/auth/protect-route";
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
        const body = await request.json();
        const uuid = body.uuid;

        if (!uuid) {
            return NextResponse.json(
                { success: false, error: "UUID required" },
                { status: 400 }
            );
        }

        if (!uuid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "UUID required",
                },
                { status: 400 }
            );
        }

        await firestore()
            .collection("materials")
            .doc(uuid)
            .delete();

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete material",
            },
            { status: 500 }
        );
    }
}