import { ArrowRightIcon, CircleCheckBigIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Chip } from "../ui/chip";
import Link from "next/link";

export default function HomepageHero() {
    return (
        <div className="flex flex-col items-center gap-8">

            {/* Gradient background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_center,color-mix(in_srgb,var(--primary)_20%,transparent)_0%,color-mix(in_srgb,var(--primary)_10%,transparent)_35%,transparent_75%)]" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_45%,color-mix(in_srgb,var(--background)_75%,transparent)_100%)]" />

            {/* Content */}
            <div className="flex flex-col items-center gap-8 z-10">
                <Chip variant="info" className="uppercase"> Filament Stock Management </Chip>

                <h1 className="flex flex-col gap-4 text-6xl font-bold tracking-wide text-center">
                    <span>Manage Your Filament. </span>
                    <span className="text-primary">Smarter.</span>
                </h1>

                <p className="text-xl text-center max-w-2xl text-muted-foreground">
                    Track every spool, scan QR codes, get low-stock alerts, and share your inventory - all from one clean dashboard built by makers for makers.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <Button
                        variant="default"
                        size="lg"
                        className="flex flex-row items-center justify-center gap-2"
                        asChild
                    >
                        <Link href="/sign-in">
                            <span>Get Started</span>
                            <ArrowRightIcon className="size-5" />
                        </Link>
                    </Button>

                    <div className="flex flex-row items-center gap-8 text-sm text-muted-foreground">
                        <span className="flex flex-row items-center gap-2">
                            <CircleCheckBigIcon className="text-success" size={16} />
                            No more spreadsheets
                        </span>

                        <span className="flex flex-row items-center gap-2">
                            <CircleCheckBigIcon className="text-success" size={16} />
                            Simple QR code system
                        </span>

                        <span className="flex flex-row items-center gap-2">
                            <CircleCheckBigIcon className="text-success" size={16} />
                            Free to use
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}