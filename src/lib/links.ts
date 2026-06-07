import { Links } from "./types";
import {
    BarChart4Icon,
    ClockFadingIcon,
    LayersIcon,
    LayoutDashboard,
    PackageIcon,
    ScanLineIcon,
    SettingsIcon,
    TagIcon,
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
        href: "/dashboard/settings/brands",
        icon: SettingsIcon,
        shortName: "Settings",
    },
];

export const settingsLinks: Links[] = [
    {
        name: "Brands",
        shortName: "Brands",
        href: "/dashboard/settings/brands",
        icon: TagIcon,
    },
    {
        name: "Materials",
        shortName: "Materials",
        href: "/dashboard/settings/materials",
        icon: LayersIcon,
    },
];