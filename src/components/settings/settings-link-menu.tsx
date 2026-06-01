"use client";

import { settingsLinks } from "@/lib/links";
import { ChevronRightIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLinkMenu() {

    const path = usePathname();

    return <>
        <aside className="flex h-full w-64 shrink-0 flex-col border-r border-accent bg-menu">
            <div className="h-[86px] border-b-2 border-accent p-4 flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Settings</h1>
                <span className="text-xs font-light uppercase">Select a Category</span>
            </div>

            <div className="flex flex-col grow p-4 gap-2">
                {
                    settingsLinks.map((link) => {
                        const Icon = link.icon ?? LinkIcon;
                        return <Link
                            href={link.href}
                            key={link.name}
                            className={`group flex flex-row gap-2 p-3 rounded-md hover:bg-primary hover:text-background dark:hover:text-foreground w-full ${path === link.href ? "bg-primary/40" : ""}`}
                        >
                            <Icon />
                            <span className="grow font-semibold">
                                {link.name}
                            </span>
                            <span className="hidden group-hover:block">
                                <ChevronRightIcon />
                            </span>
                        </Link>;
                    })
                }
            </div>
        </aside>
    </>;
};