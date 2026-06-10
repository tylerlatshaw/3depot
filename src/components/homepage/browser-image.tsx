import { Rotate3DIcon } from "lucide-react";
import { ChipVariantProps } from "../ui/chip";
import { Progress } from "../ui/progress";

type TileProps = {
    color: ChipVariantProps["variant"];
    percentage: number;
};

function Tile({
    color,
    percentage
}: TileProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-6 shadow-md">
            <div className="flex flex-row items-center gap-2">
                <div className={`h-8 w-8 bg-${color} rounded-full`} />

                <div className="grow">
                    <Progress
                        value={percentage}
                        className="h-2 rounded-full bg-accent"
                        indicatorClassName={`bg-${color}`}
                    />
                </div>
            </div>

            <div className="flex flex-col justify-start gap-2">
                <div className="bg-accent w-48 h-4 rounded" />
                <div className="bg-accent/50 w-32 h-3 rounded" />
            </div>
        </div>
    );
}

export default function BrowserImage() {
    return (
        <div className="overflow-hidden rounded-2xl border border-accent bg-card shadow-2xl w-full max-w-5xl text-sm select-none text-muted-foreground">
            <div className="flex items-center gap-4 border-b border-accent bg-card px-4 py-3">
                <div className="flex gap-2">
                    <div className="size-3 rounded-full bg-red-500" />
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <div className="size-3 rounded-full bg-green-500" />
                </div>

                <div className="flex-1 rounded-md bg-background/50 px-3 py-1">
                    {process.env.NEXT_PUBLIC_BASE_URL || <>&nbsp;</>}
                </div>
            </div>

            <div className="min-h-96 grid grid-cols-6">

                {/* Sidebar */}
                <div className="border-r border-accent bg-menu p-4 flex flex-col gap-6">
                    <div className="flex items-center gap-2 p-2">
                        <div className="aspect-square rounded-lg bg-primary p-1">
                            <Rotate3DIcon className="size-4" />
                        </div>

                        <span className="logo text-base">
                            3Depot
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 items-center w-full" >
                        <div className="flex flex-row gap-3 items-center w-full p-2" >
                            <div className="h-6 w-6 bg-accent rounded-lg" />
                            <span>Dashboard</span>
                        </div>

                        <div className="flex flex-row gap-3 items-center w-full p-2" >
                            <div className="h-6 w-6 bg-accent rounded-lg" />
                            <span>Scan</span>
                        </div>

                        <div className="flex flex-row gap-3 items-center w-full p-2 rounded-lg bg-primary/40 text-foreground" >
                            <div className="h-6 w-6 bg-primary/80 rounded-lg" />
                            <span>Inventory</span>
                        </div>

                        <div className="flex flex-row gap-3 items-center w-full p-2" >
                            <div className="h-6 w-6 bg-accent rounded-lg" />
                            <span>Analytics</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-5 bg-background p-4 flex flex-col gap-4">

                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="bg-accent w-36 h-4 rounded" />
                            <div className="bg-accent/50 w-24 h-3 rounded" />
                        </div>

                        <div className="bg-primary/40 w-22 h-8 rounded" />
                    </div>

                    <div className="flex flex-row items-center justify-start gap-2 uppercase text-[.6rem]">
                        <span className="bg-primary/40 px-2 py-1.5 rounded-2xl">All</span>
                        <span className="bg-accent px-2 py-1.5 rounded-2xl">In Stock</span>
                        <span className="bg-accent px-2 py-1.5 rounded-2xl">Low Stock</span>
                        <span className="bg-accent px-2 py-1.5 rounded-2xl">Empty</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <Tile color="success" percentage={85} />
                        <Tile color="danger" percentage={5} />
                        <Tile color="success" percentage={60} />
                        <Tile color="warning" percentage={35} />
                        <Tile color="success" percentage={85} />
                        <Tile color="danger" percentage={18} />
                    </div>
                </div>

            </div>
        </div>
    );
}