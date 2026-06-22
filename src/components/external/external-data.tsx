import { getFilament } from "@/lib/data/get-filament";
import ExternalInventoryContainer from "./external-inventory-container";
import Link from "next/link";
import { Rotate3DIcon } from "lucide-react";
import QueryTiles from "./external-query-tiles";
import { DarkModeToggle } from "../global/dark-mode-toggle";

export default async function ExternalData() {
    const inventory = await getFilament();

    return <>
        {/* Header */}
        <div className="flex items-center justify-between lg:grid h-[86px] w-full shrink-0 lg:grid-cols-3 items-center border-b-2 border-accent bg-menu px-4 md:px-24">
            <Link
                href="/"
                className="group flex items-center gap-3 justify-self-start"
            >
                <div className="aspect-square rounded-lg bg-primary p-2">
                    <Rotate3DIcon className="size-8 text-white" />
                </div>

                <div className="grow flex flex-col gap-1">
                    <span className="logo text-2xl transition-colors group-hover:text-primary">
                        3Depot
                    </span>

                    <span className="text-xs font-light uppercase transition-colors group-hover:text-primary">
                        Filament Inventory Management
                    </span>
                </div>
            </Link>

            <div className="hidden justify-self-center lg:flex">
                <QueryTiles inventory={inventory} />
            </div>

            <div className="justify-self-end">
                <DarkModeToggle />
            </div>
        </div>

        {/* Content */}
        <main className="min-h-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-4 md:px-24 py-4">
                <ExternalInventoryContainer inventory={inventory} />
            </div>
        </main>
    </>;
}