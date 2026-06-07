"use client";

import { FilamentWithHistory } from "@/lib/types";
import { flattenFilamentHistory } from "@/utilities/filament-functions";
import {
    LucideIcon,
    PackageIcon,
    ScanLineIcon,
    SpoolIcon,
    TrendingDownIcon,
} from "lucide-react";

type TileProps = {
    title: string;
    value: string | number;
    subtitle: string;
    icon: LucideIcon;
    iconColor: string;
};

function Tile({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor,
}: TileProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-6 shadow-md">
            <div className="flex flex-row items-center justify-between">

                <Icon className={`h-8 w-8 text-${iconColor}`} />

                <span className="text-sm font-light uppercase">
                    {title}
                </span>
            </div>

            <span className="text-5xl font-bold">
                {value}
            </span>

            <span className="text-sm font-light">
                {subtitle}
            </span>
        </div>
    );
}

export default function QueryTiles({
    inventory,
}: {
    inventory: FilamentWithHistory[];
}) {

    const flattenedHistory = flattenFilamentHistory(inventory);

    const last30Days = new Date();

    last30Days.setDate(
        last30Days.getDate() - 30
    );

    const scansLast30Days = flattenedHistory.filter(
        x => {
            return new Date(x.dateCreated) > last30Days;
        }
    );

    const spoolsUsedLast30Days = [
        ...new Set(
            flattenedHistory
                .filter(
                    x =>
                        new Date(x.dateCreated) > last30Days &&
                        x.action === "log weight"
                )
                .map(
                    x => x.filamentId
                )
        )
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Tile
                title="Total Spools"
                value={
                    inventory.filter(
                        x =>
                            x.status === "in stock" ||
                            x.status === "low stock" ||
                            x.status === "empty"
                    ).length
                }
                subtitle="In stock or low stock"
                icon={PackageIcon}
                iconColor="info"
            />

            <Tile
                title="Low Stock"
                value={
                    inventory.filter(
                        x =>
                            x.status === "low stock" ||
                            x.status === "empty"
                    ).length
                }
                subtitle="Weight below 40%"
                icon={TrendingDownIcon}
                iconColor="danger"
            />

            <Tile
                title="Spools used"
                value={spoolsUsedLast30Days.length}
                subtitle="Last 30 days"
                icon={SpoolIcon}
                iconColor="success"
            />

            <Tile
                title="Scans"
                value={scansLast30Days.length}
                subtitle="Last 30 days"
                icon={ScanLineIcon}
                iconColor="warning"
            />
        </div>
    );
}