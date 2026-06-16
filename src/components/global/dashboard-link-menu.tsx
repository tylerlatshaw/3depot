"use client";

import { dashboardLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLinkMenu() {
    const path = usePathname();

    return (
        <>
            {dashboardLinks.map((link) => {
                const Icon = link.icon ?? LinkIcon;

                const isActive = path === link.href;

                const linkText = <>
                    <Icon className="size-5" />

                    <span className="text-xs md:text-base font-semibold hidden md:block">
                        {link.name}
                    </span>

                    <span className="text-xs md:text-base font-semibold block md:hidden">
                        {link.shortName}
                    </span>

                    <span className="ml-auto hidden md:group-hover:block">
                        <ChevronRightIcon />
                    </span>
                </>;

                const classes = "group flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-1.5 md:p-3 rounded-md hover:bg-primary hover:text-background dark:hover:text-foreground md:w-full transition-colors";

                if (isActive) {
                    return (
                        <a
                            href={link.href}
                            key={link.name}
                            className={cn(classes, isActive && "bg-primary/40")}
                        >
                            {linkText}
                        </a>
                    );
                }

                return (
                    <Link
                        href={link.href}
                        key={link.name}
                        className={cn(classes, isActive && "bg-primary/40")}
                    >
                        {linkText}
                    </Link>
                );
            })}
        </>
    );
}