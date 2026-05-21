"use client";

import { dashboardLinks } from "@/lib/links";
import { ChevronRightIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLinkMenu() {

    const path = usePathname();

    return <>
        {
            dashboardLinks.map((link) => {
                const Icon = link.icon ?? LinkIcon;
                return <Link
                    href={link.href}
                    key={link.name}
                    className={`group flex flex-row gap-2 p-3 rounded-md hover:bg-primary hover:text-foreground w-full ${path === link.href ? "bg-primary/40" : ""}`}
                >
                    <Icon />
                    <span className="grow font-semibold">
                        {link.name}
                    </span>
                    <span className="hidden group-hover:block">
                        <ChevronRightIcon />
                    </span>
                </Link>
            })
        }
    </>;
};