import { firestore } from "firebase-admin";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(
            request.url
        );

        const uuid =
            searchParams.get("uuid");

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