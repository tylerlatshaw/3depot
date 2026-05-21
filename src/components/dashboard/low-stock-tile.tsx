"use client";

import { FilamentWithHistory } from "@/lib/types";
import { TrendingDownIcon } from "lucide-react";
import { Progress } from "../ui/progress";
import { Chip } from "../ui/chip";
import NoData from "../global/no-data";

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
            lowStock.length > 0 && <div className="grid grid-cols-1 gap-4">
                {
                    lowStock.map(x => {
                        return <div className="flex flex-row gap-3 items-center justify-center w-full p-2" key={x.id}>

                            <div className={`h-14 w-14 rounded-full`} style={{ backgroundColor: x.colorCode }}></div>

                            <div className="flex flex-col gap-2 w-full">
                                {/* Stats Row */}
                                <div className="flex flex-row items-center gap-4 w-full text-lg font-light">
                                    <span className="flex gap-2 grow">
                                        <span className="font-bold">{x.brand + " " + x.color}</span>
                                        <span>•</span>
                                        <span>{x.id}</span>
                                    </span>

                                    <Chip variant={"danger"}>{x.remainingWeight} g left</Chip>
                                </div>

                                {/* Progress Bar */}
                                <div className="flex flex-row items-center gap-4 w-full">
                                    <Progress
                                        value={x.percentRemaining}
                                        className="h-2 rounded-full bg-accent"
                                        indicatorClassName={"bg-danger"}
                                    />
                                    <span className="text-sm font-semibold text-danger">{x.percentRemaining}%</span>
                                </div>
                            </div>

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