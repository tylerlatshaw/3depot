import { getFilament } from "@/lib/data/get-filament";
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
        const filament = await getFilament();

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