import { BarChart3Icon, LayoutDashboardIcon, LucideIcon, QrCodeIcon, ScaleIcon } from "lucide-react";
import { ChipVariantProps } from "../ui/chip";
import { Progress } from "../ui/progress";

type TileProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBackground: string;
};

function Tile({
    title,
    description,
    icon: Icon,
    iconColor,
    iconBackground
}: TileProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-4 md:p-6 w-full border border-accent hover:border-primary shadow-lg">
            <div className="flex flex-col items-start justify-center gap-3">
                <div className={`flex items-center justify-center rounded-lg p-2 ${iconBackground}`}>
                    <Icon className={`h-8 w-8 ${iconColor}`} />
                </div>

                <div className="flex flex-col items-start justify-center gap-1">
                    <span className="text-lg font-semibold">{title}</span>
                    <span className="text-sm text-muted-foreground">{description}</span>
                </div>
            </div>
        </div>
    );
}

export default function SellingFeatures() {
    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full">

            <h2 className="text-3xl font-bold text-center">Everything you need for filament inventory management</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
                <Tile
                    title={"Log Weight"}
                    description={"Estimate and track remaining filament inventory by scanning and logging spool weights."}
                    icon={ScaleIcon}
                    iconColor={"text-success"}
                    iconBackground={"bg-success/20"}
                />

                <Tile
                    title={"QR Scanning"}
                    description={"Easily scan QR codes on filament spools to log new weights and update information."}
                    icon={QrCodeIcon}
                    iconColor={"text-danger"}
                    iconBackground={"bg-danger/20"}
                />

                <Tile
                    title={"Dashboard"}
                    description={"Get low stock alerts and view filament inventory at a quick glance on the dashboard."}
                    icon={LayoutDashboardIcon}
                    iconColor={"text-primary"}
                    iconBackground={"bg-primary/20"}
                />

                <Tile
                    title={"Analytics"}
                    description={"See usage trends by material and brand. Know what to reorder before you run out."}
                    icon={BarChart3Icon}
                    iconColor={"text-warning"}
                    iconBackground={"bg-warning/20"}
                />
            </div>

        </div>
    );
}