import { Links } from "./types";
import { BarChart4Icon, ClockFadingIcon, LayoutDashboard, PackageIcon, ScanLineIcon, SettingsIcon } from "lucide-react";

export const dashboardLinks: Links[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Scan Filament",
        href: "/dashboard/scan",
        icon: ScanLineIcon,
    },
    {
        name: "Inventory",
        href: "/dashboard/inventory",
        icon: PackageIcon,
    },
    {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart4Icon
    },
    {
        name: "Recent Activity",
        href: "/dashboard/recent-activity",
        icon: ClockFadingIcon
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: SettingsIcon
    },
];