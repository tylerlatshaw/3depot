"use client";

import { FilamentWithHistory } from "@/lib/types";
import QueryTiles from "./query-tiles";
import LowStockTile from "./low-stock-tile";
import RecentActivityTile from "./recent-activity-tile";

export default function DashboardContainer({ inventory }: { inventory: FilamentWithHistory[] }) {

    return (<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="col-span-2 md:col-span-4">
            <QueryTiles inventory={inventory} />
        </div>

        <div className="col-span-2 flex flex-col gap-4 rounded-xl bg-card p-4 md:p-6 md:min-h-112 shadow-md">
            <LowStockTile inventory={inventory} />
        </div>

        <div className="col-span-2 flex flex-col gap-4 rounded-xl bg-card p-4 md:p-6 md:min-h-112 shadow-md">
            <RecentActivityTile inventory={inventory} />
        </div>
    </div>);
}