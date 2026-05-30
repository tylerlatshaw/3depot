import { getFilament } from "@/lib/data/get-filament";
import { NextResponse } from "next/server";

export async function GET() {
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