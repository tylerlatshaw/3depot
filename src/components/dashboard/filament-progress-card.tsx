"use client";

import { Filament, FilamentWithHistory } from "@/lib/types";
import { Progress } from "../ui/progress";
import { Chip } from "../ui/chip";
import { getStatusChipColor } from "@/utilities/color-functions";
import { cn } from "@/lib/utils";

export default function FilamentProgressCard({
    inventory,
}: {
    inventory: FilamentWithHistory | Filament;
}) {

    const statusColorMap = {
        default: "bg-foreground",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
        info: "bg-info"
    } as const;

    const statusColor = getStatusChipColor(inventory.status);

    return <div className="flex flex-row gap-3 items-center justify-center w-full p-2">

        <div className={`h-14 w-14 aspect-square rounded-full`} style={{ backgroundColor: inventory.colorCode }}></div>

        <div className="flex flex-col gap-2 w-full">
            {/* Stats Row */}
            <div className="flex flex-row items-center gap-4 w-full text-lg font-light">
                <span className="flex gap-2 grow">
                    <span className="font-bold">{inventory.brand + " " + inventory.color}</span>
                    <span>•</span>
                    <span>{inventory.id}</span>
                </span>

                <Chip variant={statusColor}>{inventory.remainingWeight} g left</Chip>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-row items-center gap-4 w-full">
                <Progress
                    value={inventory.percentRemaining}
                    className="h-2 rounded-full bg-accent"
                    indicatorClassName={statusColorMap[statusColor!]}
                />
                <span className={cn("text-sm font-semibold", ("text-" + statusColor))}>{inventory.percentRemaining}%</span>
            </div>
        </div>

    </div>
}