import { protectRoute } from "@/lib/auth/protect-route";
import { NextRequest, NextResponse } from "next/server";
import { getMaterials } from "@/lib/data/get-materials";

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
        const materials = await getMaterials();

        return NextResponse.json({
            success: true,
            data: materials,
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