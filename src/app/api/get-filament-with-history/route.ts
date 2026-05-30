import { getFilamentWithHistory } from "@/lib/data/get-filament-with-history";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const filament = await getFilamentWithHistory();

        return NextResponse.json({
            success: true,
            data: filament,
        });
    } catch (error) {
        console.error("Error fetching filament with history:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch filament with history",
            },
            {
                status: 500,
            }
        );
    }
}