import { Links } from "./types";
import {
    BarChart4Icon,
    ClockFadingIcon,
    LayoutDashboard,
    PackageIcon,
    ScanLineIcon,
    SettingsIcon,
} from "lucide-react";

export const dashboardLinks: Links[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        shortName: "Dashboard",
    },
    {
        name: "Scan Filament",
        href: "/dashboard/scan",
        icon: ScanLineIcon,
        shortName: "Scan",
    },
    {
        name: "Inventory",
        href: "/dashboard/inventory",
        icon: PackageIcon,
        shortName: "Inventory",
    },
    {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart4Icon,
        shortName: "Analytics",
    },
    {
        name: "Recent Activity",
        href: "/dashboard/recent-activity",
        icon: ClockFadingIcon,
        shortName: "Activity",
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: SettingsIcon,
        shortName: "Settings",
    },
];