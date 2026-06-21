import { LucideIcon } from "lucide-react";

type TileProps = {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    iconColor: string;
};

export function DashboardQueryTile({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor,
}: TileProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-6 shadow-md">
            <div className="flex flex-row items-center justify-between">

                <Icon className={`h-8 w-8 text-${iconColor}`} />

                <span className="text-sm font-light uppercase">
                    {title}
                </span>
            </div>

            <span className="text-5xl font-bold">
                {value}
            </span>

            <span className="text-sm font-light">
                {subtitle}
            </span>
        </div>
    );
}