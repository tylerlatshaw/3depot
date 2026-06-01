import { getBrands } from "@/lib/data/get-brands";
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
        const brands = await getBrands();

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