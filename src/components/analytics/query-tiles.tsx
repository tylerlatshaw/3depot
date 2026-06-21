"use client";

import { FilamentWithHistory } from "@/lib/types";
import {
    PackageIcon,
    ScaleIcon,
    TagsIcon,
} from "lucide-react";
import { DashboardQueryTile } from "../global/dashboard-query-tile";

export default function QueryTiles({
    inventory,
}: {
    inventory: FilamentWithHistory[];
}) {

    const remainingStock = inventory.filter(
        x =>
            x.status === "in stock" ||
            x.status === "low stock" ||
            x.status === "empty"
    );

    const remainingStockWeight = remainingStock.reduce((prev, curr) => {
        return prev + curr.remainingWeight;
    }, 0);

    const totalRemaining = remainingStock.reduce(
        (sum, filament) => sum + filament.remainingWeight,
        0
    );

    const totalOriginal = remainingStock.reduce(
        (sum, filament) =>
            sum +
            Math.max(
                filament.startingWeight - filament.spoolWeight,
                0
            ),
        0
    );

    const averageFill =
        totalOriginal > 0
            ? (totalRemaining / totalOriginal) * 100
            : 0;

    const uniqueBrands = [
        ...new Set(
            remainingStock.map((filament) => filament.brand)
        ),
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
            <DashboardQueryTile
                title="Total Spools"
                value={remainingStock.length}
                subtitle="In stock or low stock"
                icon={PackageIcon}
                iconColor="info"
            />

            <DashboardQueryTile
                title="Remaining Stock"
                value={(remainingStockWeight / 1000).toFixed(1)}
                subtitle="kg Remaining"
                icon={ScaleIcon}
                iconColor="danger"
            />

            <DashboardQueryTile
                title="Average Fill Level"
                value={averageFill.toFixed(1) + "%"}
                icon={TagsIcon}
                subtitle="% Remaining"
                iconColor="success"
            />

            <DashboardQueryTile
                title="Total Brands"
                value={uniqueBrands.length}
                icon={TagsIcon}
                subtitle="Unique Brands"
                iconColor="warning"
            />
        </div>
    );
}