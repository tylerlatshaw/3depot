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
        <div className="flex h-[86px] shrink-0 items-center justify-between border-b-2 border-accent bg-menu px-24">
            <Link
                href="/"
                className="group flex items-center gap-3"
            >
                <div className="aspect-square rounded-lg bg-primary p-2">
                    <Rotate3DIcon className="size-8 text-white" />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="logo text-2xl transition-colors group-hover:text-primary">
                        3Depot
                    </span>

                    <span className="text-xs font-light uppercase transition-colors group-hover:text-primary">
                        Filament Inventory Management
                    </span>
                </div>
            </Link>

            <QueryTiles inventory={inventory} />

            <DarkModeToggle />
        </div>

        {/* Content */}
        <main className="min-h-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-24 py-4">
                <ExternalInventoryContainer inventory={inventory} />
            </div>
        </main>
    </>;
}