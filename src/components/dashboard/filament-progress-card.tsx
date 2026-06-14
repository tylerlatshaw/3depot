"use client";

import { Filament, FilamentWithHistory } from "@/lib/types";
import { Progress } from "../ui/progress";
import { Chip } from "../ui/chip";
import { getStatusChipColor, getStatusTextColor } from "@/utilities/color-functions";
import { cn } from "@/lib/utils";

export default function FilamentProgressCard({
    inventory,
}: {
    inventory: FilamentWithHistory | Filament;
}) {

    const statusTextColorMap = {
        foreground: "text-success",
        warning: "text-warning",
        danger: "text-danger",
    } as const;

    const statusBgColorMap = {
        foreground: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
    } as const;

    const chipVariantColor = getStatusChipColor(inventory.status);
    const statusTextColor = getStatusTextColor(inventory.percentRemaining);

    return <div className="flex flex-row gap-3 items-center justify-center w-full md:p-2">

        <div className={"h-14 w-14 aspect-square rounded-full"} style={{ backgroundColor: inventory.colorCode }}></div>

        <div className="flex flex-col gap-2 w-full min-w-0">

            {/* Stats Row */}
            <div className="flex min-w-0 w-full flex-row items-center gap-4 text-lg font-light">
                <span className="flex min-w-0 flex-1 flex-col gap-0 overflow-hidden md:flex-row md:items-center md:justify-start md:gap-2">
                    <span className="block min-w-0 flex-1 md:flex-none truncate font-bold">
                        {inventory.brand} {inventory.color}
                    </span>

                    <span className="hidden shrink-0 md:inline">•</span>

                    <span className="shrink-0">
                        {inventory.id}
                    </span>
                </span>

                <Chip
                    className="flex gap-1 shrink-0 whitespace-nowrap"
                    variant={chipVariantColor}
                >
                    <span>{inventory.remainingWeight} g</span>
                    <span className="hidden md:inline">left</span>
                </Chip>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-row items-center gap-4 w-full">
                <Progress
                    value={inventory.percentRemaining}
                    className="h-2 rounded-full bg-accent"
                    indicatorClassName={statusBgColorMap[statusTextColor!]}
                />
                <span className={cn("text-sm font-semibold", (statusTextColorMap[statusTextColor]))}>{inventory.percentRemaining.toFixed(0)}%</span>
            </div>
        </div>

    </div>;
}