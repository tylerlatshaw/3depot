import dayjs from "dayjs";
import { Rotate3DIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-menu border-t border-accent/50">
            <div className="flex flex-row items-center justify-between max-w-7xl mx-auto py-8">
                <div className="flex flex-col gap-2">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="aspect-square rounded-lg bg-primary p-1.5">
                            <Rotate3DIcon className="size-5 text-white" />
                        </div>

                        <span className="logo text-lg transition-colors group-hover:text-primary">
                            3Depot
                        </span>
                    </Link>

                    <span className="text-xs text-muted-foreground">
                        &copy; {dayjs().year()} 3Depot Filament Inventory Management. All rights reserved.
                    </span>
                </div>

                <div className="flex flex-row items-center gap-8">
                    <Link href={"/privacy-policy"} className="text-muted-foreground font-semibold hover:text-foreground hover:underline">Privacy Policy</Link>
                    <Link href={"/terms-of-use"} className="text-muted-foreground font-semibold hover:text-foreground hover:underline">Terms of Use</Link>
                    <Link href={"/contact"} className="text-muted-foreground font-semibold hover:text-foreground hover:underline">Contact</Link>
                </div>
            </div>
        </footer>
    );
}