"use client";

import { Filament } from "@/lib/types";
import {
    LucideIcon,
    PackageIcon,
    Spool,
    TrendingDownIcon,
} from "lucide-react";
import { Chip, ChipVariantProps } from "../ui/chip";

type TileProps = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    iconColor: ChipVariantProps["variant"];
};

function Tile({
    title,
    value,
    icon: Icon,
    iconColor,
}: TileProps) {
    return (
        <Chip variant={iconColor!} className="flex flex-row items-center justify-center gap-2 px-2 py-1">
            <Icon className={`size-6 text-${iconColor}`} />
            {value + " " + title}
        </Chip>
    );
}

export default function QueryTiles({
    inventory,
}: {
    inventory: Filament[];
}) {

    return (
        <div className="flex flex-row items-center justify-center gap-6">
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
                icon={Spool}
                iconColor="info"
            />

            <Tile
                title="In Stock"
                value={
                    inventory.filter(
                        x =>
                            x.status === "in stock"
                    ).length
                }
                icon={PackageIcon}
                iconColor="success"
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
                icon={TrendingDownIcon}
                iconColor="danger"
            />
        </div>
    );
}