"use client";

import { FilamentWithHistory } from "@/lib/types";
import { flattenFilamentHistory } from "@/utilities/filament-functions";
import {
    PackageIcon,
    ScanLineIcon,
    SpoolIcon,
    TrendingDownIcon,
} from "lucide-react";
import { DashboardQueryTile } from "../global/dashboard-query-tile";

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
            <DashboardQueryTile
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

            <DashboardQueryTile
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

            <DashboardQueryTile
                title="Spools used"
                value={spoolsUsedLast30Days.length}
                subtitle="Last 30 days"
                icon={SpoolIcon}
                iconColor="success"
            />

            <DashboardQueryTile
                title="Scans"
                value={scansLast30Days.length}
                subtitle="Last 30 days"
                icon={ScanLineIcon}
                iconColor="warning"
            />
        </div>
    );
}