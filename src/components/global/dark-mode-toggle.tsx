"use client";

import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DarkModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-foreground/20"
                    suppressHydrationWarning
                >
                    <SunIcon className="dark:hidden" />
                    <MoonIcon className="hidden dark:block" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-background border border-accent">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        <SunIcon />
                        Light
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <MoonIcon />
                        Dark
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        <LaptopIcon />
                        System
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}