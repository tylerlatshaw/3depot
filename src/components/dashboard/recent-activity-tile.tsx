"use client";

import { FilamentWithHistory } from "@/lib/types";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { Progress } from "../ui/progress";
import { Chip } from "../ui/chip";
import { Button } from "../ui/button";
import Link from "next/link";
import { flattenFilamentHistory } from "@/utilities/filament-functions";
import { getRelativeTime } from "@/utilities/date-functions";
import NoData from "../global/no-data";

export default function RecentActivityTile({
    inventory,
}: {
    inventory: FilamentWithHistory[];
}) {

    const flattenedHistory = flattenFilamentHistory(inventory);

    const inventoryById = new Map(
        inventory.map((filament) => [
            filament.id,
            filament,
        ])
    );

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentActivity = flattenedHistory
        .filter((item) => new Date(item.dateCreated) > last30Days)
        .sort(
            (a, b) =>
                new Date(b.dateCreated).getTime() -
                new Date(a.dateCreated).getTime()
        )
        .slice(0, 10)
        .map((item) => {
            const filament = inventoryById.get(item.filamentId);

            return {
                ...item,
                filament,
            };
        });

    const actionMap = {
        "created": {
            display: "Created Filament",
            textColor: "text-foreground",
        },
        "log weight": {
            display: "Logged New Weight",
            textColor: "text-info",
        },
        "change status": {
            display: "Status Updated",
            textColor: "text-warning",
        },
        "change info": {
            display: "Info Updated",
            textColor: "text-success",
        },
        "removed": {
            display: "Removed",
            textColor: "text-danger",
        },
    } as const;

    return (<>
        <div className="flex flex-row items-center justify-between h-10">
            <div className="flex flex-row gap-3 items-center uppercase text-info font-semibold">
                <ClockIcon />
                <span>Recent Activity</span>
            </div>

            <Button variant={"outline"} asChild>
                <Link href="/dashboard/recent-activity" className="flex flex-row items-center gap-2">
                    <span>View All</span>
                    <ArrowRightIcon />
                </Link>
            </Button>
        </div>

        {
            recentActivity.length > 0 && <div className="grid grid-cols-1 gap-2 divide-y divide-accent">
                {
                    recentActivity.map(x => {
                        if (x.filament === undefined) return null;

                        const actionInfo = actionMap[x.action];

                        return <div className="flex flex-row gap-3 items-center justify-center w-full p-2 pb-3" key={x.historyId}>

                            <div className={`h-14 w-14 rounded-full`} style={{ backgroundColor: x.filament.colorCode }}></div>

                            <div className="flex flex-col grow">

                                <div className="flex flex-row items-center gap-4 w-full text-lg font-light">
                                    <span className="font-bold">{x.filament.brand + " " + x.filament.color}</span>
                                </div>

                                <div className="text-base font-light">
                                    <span>{x.filament.id}</span>
                                </div>
                            </div>

                            <div className="flex flex-col text-right">
                                <span className={`font-bold ${actionInfo.textColor}`}>
                                    {actionInfo.display}
                                </span>

                                <span className="font-light">
                                    {getRelativeTime(x.dateCreated)}
                                </span>
                            </div>

                        </div>
                    })
                }
            </div>
        }

        {
            recentActivity.length === 0 && <div className="flex w-full items-center justify-center pb-10 grow">
                <NoData />
            </div>
        }
    </>
    );
}