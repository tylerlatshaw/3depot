"use client";

import { FilamentWithHistory } from "@/lib/types";
import QueryTiles from "./query-tiles";
import LowStockTile from "./low-stock-tile";
import RecentActivityTile from "./recent-activity-tile";

export default function DashboardContainer({ inventory }: { inventory: FilamentWithHistory[] }) {

    return (<div className="grid grid-cols-4 gap-6 pt-2">
        <div className="col-span-4">
            <QueryTiles inventory={inventory} />
        </div>

        <div className="col-span-2 flex flex-col gap-4 rounded-xl bg-card p-6 min-h-112">
            <LowStockTile inventory={inventory} />
        </div>

        <div className="col-span-2 flex flex-col gap-4 rounded-xl bg-card p-6 min-h-112">
            <RecentActivityTile inventory={inventory} />
        </div>
    </div>);
}