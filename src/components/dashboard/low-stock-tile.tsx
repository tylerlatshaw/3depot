"use client";

import { FilamentWithHistory } from "@/lib/types";
import { TrendingDownIcon } from "lucide-react";
import NoData from "../global/no-data";
import FilamentProgressCard from "./filament-progress-card";

export default function LowStockTile({
    inventory,
}: {
    inventory: FilamentWithHistory[];
}) {

    const lowStock = inventory.filter(x => {
        return x.status === "low stock"
    })

    return (<>
        <div className="flex flex-row gap-3 items-center uppercase text-danger font-semibold h-10">
            <TrendingDownIcon />
            <span>Low Stock Alerts</span>
        </div>

        {
            lowStock.length > 0 && <div className="grid grid-cols-1 gap-2 divide-y divide-accent">
                {
                    lowStock.map(x => {
                        return <div key={x.id} className="pb-1">
                            <FilamentProgressCard inventory={x} />
                        </div>
                    })
                }
            </div>
        }

        {
            lowStock.length === 0 && <div className="flex w-full items-center justify-center pb-10 grow">
                <NoData />
            </div>
        }
    </>
    );
}