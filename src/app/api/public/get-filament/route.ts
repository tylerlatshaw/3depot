import { getFilament } from "@/lib/data/get-filament";
import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

const getCachedPublicFilament = unstable_cache(
    async () => getFilament(),
    ["public-filament"],
    {
        revalidate: 86400, // 1 daily
        tags: ["public-filament"],
    }
);

export async function GET() {
    try {
        const filament = await getCachedPublicFilament();

        return NextResponse.json({
            success: true,
            data: filament,
        });
    } catch (error) {
        console.error("Error fetching public filament:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch public filament",
            },
            { status: 500 }
        );
    }
}