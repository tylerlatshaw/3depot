import { Filament } from "@/lib/types";
import { Chip } from "../ui/chip";
import { Progress } from "../ui/progress";
import dayjs from "dayjs";
import { getContrastingColor, getStatusChipColor, getStatusTextColor, hexToRgba } from "@/utilities/color-functions";
import { QrCodeIcon, ReceiptIcon, ScanLineIcon, SpoolIcon, XIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

export default function ExternalFilamentCard({ filament }: { filament: Filament }) {

    const {
        brand,
        id,
        color,
        colorCode,
        remainingWeight,
        lastScanned,
        percentRemaining,
        status,
        startingWeight,
        tags,
        swatchImageUrl,
        material,
        datePurchased
    } = filament;

    const originalFilamentWeight = Math.max(
        startingWeight - filament.spoolWeight,
        0
    );

    const chipVariantColor = getStatusChipColor(status);
    const statusTextColor = getStatusTextColor(percentRemaining);

    const statusTextColorMap = {
        foreground: "text-success",
        warning: "text-warning",
        danger: "text-danger",
    } as const;

    const statusBgColorMap = {
        foreground: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
    } as const;

    return (
        <Dialog>
            <DialogTrigger asChild>

                {/* Filament Card */}
                <div className="group hover:ring hover:ring-primary flex flex-col gap-2 bg-card rounded-xl px-4 py-4 pb-8 cursor-pointer shadow-md">

                    {/* Color Info Row */}
                    <div className="flex flex-row items-center gap-2 w-full">
                        <div className="p-2">
                            <div className={"h-12 w-12 rounded-full"} style={{ backgroundColor: colorCode }}></div>
                        </div>

                        <div className="flex min-w-0 w-full flex-col justify-center gap-1">
                            <div className="flex min-w-0 w-full items-start justify-center gap-1">
                                <div className="flex min-w-0 flex-1 overflow-hidden">
                                    <span className="block min-w-0 max-w-full truncate text-lg font-semibold leading-none">
                                        {brand + " " + color}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-row text-xs font-light uppercase">
                                {
                                    tags.length > 0 && tags.join(" • ")
                                }
                            </div>

                        </div>

                        <Chip
                            variant={chipVariantColor}
                            className="shrink-0 text-nowrap"
                        >
                            {status}
                        </Chip>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-4 flex flex-row items-center gap-4 w-full text-sm font-medium">
                        <span className="flex gap-1 grow">
                            <span>ID: {id}</span>
                        </span>
                        <span className={`flex flex-row gap-2 font-semibold ${statusTextColorMap[statusTextColor]}`}>
                            <span>{remainingWeight} g</span>
                            <span>/</span>
                            <span>{originalFilamentWeight} g</span>
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Progress
                            value={percentRemaining}
                            className="h-2 rounded-full bg-accent"
                            indicatorClassName={statusBgColorMap[statusTextColor]}
                        />
                        <span className={`text-sm font-semibold tabular-nums ${statusTextColorMap[statusTextColor]}`}>{percentRemaining.toFixed(0)}%</span>
                    </div>

                </div>
            </DialogTrigger>

            {/* Expanded Info Modal */}
            <DialogContent className="w-[95%] lg:w-1/2 text-base" showCloseButton={false}>
                <DialogHeader className="w-full">
                    <DialogDescription className={swatchImageUrl ? "grid grid-cols-1 md:grid-cols-5 w-full" : "grid grid-cols-1 w-full"}>

                        <DialogTitle className="sr-only">{brand + " " + color}</DialogTitle>

                        {
                            swatchImageUrl && <>
                                <div className="relative flex w-full justify-center md:col-span-2">
                                    <Image
                                        src={swatchImageUrl}
                                        alt={`${brand} ${color} swatch`}
                                        className="rounded-t-lg md:rounded-t-none md:rounded-l-lg object-cover"
                                        width={1024}
                                        height={1024}
                                    />

                                    <div className="rounded-t-lg md:rounded-t-none md:rounded-l-lg absolute inset-x-0 bottom-0 h-2/5 w-full bg-gradient-to-t from-black/80 to-transparent" />

                                    <div className="absolute flex items-end inset-x-0 bottom-0 h-1/3 w-full">
                                        <div
                                            className="relative flex flex-row items-center justify-between m-3 mb-4 rounded-lg p-3 w-full"
                                            style={{ backgroundColor: hexToRgba(colorCode, 0.5), border: `2px solid ${getContrastingColor(colorCode)}` }}
                                        >
                                            <div className="flex flex-col gap-1" style={{ color: getContrastingColor(colorCode) }}>
                                                <span className="text-sm font-light uppercase">Color</span>
                                                <span className="text-lg font-bold leading-none">{color}</span>
                                            </div>

                                            <div className="rounded-full h-12 w-12" style={{ background: colorCode, border: `2px solid ${getContrastingColor(colorCode)}` }}>&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        <div className={swatchImageUrl ? "col-span-1 md:col-span-3" : "col-span-1"}>
                            <div className="flex flex-col w-full gap-4 md:gap-6 items-center p-8 pb-6 md:pb-4">

                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-row w-full items-start justify-center">
                                        <div className="grow">
                                            <span className="text-sm font-light uppercase">{brand}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row w-full items-center md:items-start">
                                        <div className="grow">
                                            <span className="text-lg md:text-2xl font-bold leading-none">{brand + " " + color}</span>
                                        </div>

                                        <Chip variant={chipVariantColor}>{status}</Chip>
                                    </div>
                                </div>

                                <hr className="border border-accent w-full" />

                                <div className="flex flex-col w-full gap-2">
                                    <div className="flex flex-row items-center gap-2 w-full text-sm font-medium">
                                        <span className="flex gap-1 grow uppercase text-base font-lighter">
                                            <span>Remaining:</span>
                                        </span>
                                        <span className={`flex flex-row gap-2 font-semibold ${statusTextColorMap[statusTextColor]}`}>
                                            <span>{remainingWeight} g</span>
                                            <span>/</span>
                                            <span>{originalFilamentWeight} g</span>
                                        </span>
                                    </div>

                                    <div className="flex flex-row items-center gap-4 w-full">
                                        <Progress
                                            value={percentRemaining}
                                            className="h-3 rounded-full bg-accent"
                                            indicatorClassName={statusBgColorMap[statusTextColor]}
                                        />
                                        <span className={`text-sm font-semibold tabular-nums ${statusTextColorMap[statusTextColor]}`}>{percentRemaining.toFixed(0)}%</span>
                                    </div>
                                </div>

                                <hr className="border border-accent w-full" />

                                <div className="grid grid-cols-2 w-full">
                                    <div className="col-span-1 flex flex-col gap-6 w-full">
                                        <div className="flex flex-col">
                                            <div className="flex gap-1 items-center text-sm font-light uppercase">
                                                <QrCodeIcon size={16} strokeWidth={1} />
                                                <span>ID</span>
                                            </div>
                                            <span className="font-bold">{id}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex gap-1 items-center text-sm font-light uppercase">
                                                <ReceiptIcon size={20} strokeWidth={1} />
                                                <span>Purchased</span>
                                            </div>
                                            <span className="font-bold">{datePurchased ? dayjs(datePurchased).format("M/D/YYYY") : "N/A"}</span>
                                        </div>
                                    </div>

                                    <div className="col-span-1 flex flex-col gap-6 w-full">
                                        <div className="flex flex-col">
                                            <div className="flex gap-1 items-center text-sm font-light uppercase">
                                                <SpoolIcon size={20} strokeWidth={1} />
                                                <span>Material</span>
                                            </div>
                                            <span className="font-bold">{material}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex gap-1 items-center text-sm font-light uppercase">
                                                <ScanLineIcon size={16} strokeWidth={1} />
                                                <span>Last Scanned</span>
                                            </div>
                                            <span className="font-bold">{lastScanned ? dayjs(lastScanned).format("M/D/YYYY") : "N/A"}</span>
                                        </div>
                                    </div>
                                </div>

                                <DialogClose asChild>
                                    <div className="absolute top-4 right-4 rounded-full focus:outline-none p-0 cursor-pointer">
                                        <XIcon className="size-6" />
                                    </div>
                                </DialogClose>
                            </div>
                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}