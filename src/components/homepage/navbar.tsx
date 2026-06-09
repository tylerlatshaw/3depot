import { ArrowRightIcon, Rotate3DIcon } from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "../global/dark-mode-toggle";
import { Button } from "../ui/button";
import InstallAppButton from "@/components/global/install-button";

export default function Navbar() {
    return (
        <nav className="w-full bg-menu border-b border-accent/50">
            <div className="flex flex-row items-center justify-between max-w-7xl mx-auto p-4">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="aspect-square rounded-lg bg-primary p-2">
                        <Rotate3DIcon className="size-7 text-white" />
                    </div>

                    <span className="logo text-2xl transition-colors group-hover:text-primary">
                        3Depot
                    </span>
                </Link>

                <div className="flex flex-row items-center gap-6">
                    <InstallAppButton />

                    <Button
                        variant="default"
                        size="lg"
                        className="flex flex-row items-center justify-center gap-2"
                        asChild
                    >
                        <Link href="/sign-in">
                            <span>Sign In</span>
                            <ArrowRightIcon className="size-5" />
                        </Link>
                    </Button>

                    <DarkModeToggle />
                </div>
            </div>
        </nav>
    );
}