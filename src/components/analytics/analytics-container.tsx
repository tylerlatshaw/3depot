"use client";

import { FilamentWithHistory } from "@/lib/types";
import QueryTiles from "./query-tiles";
import ColorPieChart from "./color-pie-chart";
import FilamentConsumedChart from "./filament-consumed-chart";
import FilamentByBrandChart from "./filament-by-brand";
import ConsumptionTrendChart from "./consumption-trend";

export default function AnalyticsContainer({ inventory }: { inventory: FilamentWithHistory[] }) {

    return (<div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full">
        <div className="col-span-1 md:col-span-4 w-full">
            <QueryTiles inventory={inventory} />
        </div>

        <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-6">
            <ColorPieChart inventory={inventory} />
            <FilamentConsumedChart inventory={inventory} />
        </div>

        <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-6">
            <FilamentByBrandChart inventory={inventory} />
            <ConsumptionTrendChart inventory={inventory} />
        </div>
    </div>);
}