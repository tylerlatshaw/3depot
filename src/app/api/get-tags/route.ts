import { getTags } from "@/lib/data/get-tags";
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
        const tags = await getTags();

        return NextResponse.json({
            success: true,
            data: tags,
        });
    } catch (error) {
        console.error("Error fetching tag data:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch tag data",
            },
            {
                status: 500,
            }
        );
    }
}