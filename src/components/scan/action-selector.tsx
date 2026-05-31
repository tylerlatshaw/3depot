"use client";

import { EntryModeOptions, Filament, FormActions } from "@/lib/types";
import FilamentProgressCard from "../dashboard/filament-progress-card";
import { ChevronRightIcon, HistoryIcon, LucideIcon, ScaleIcon, SettingsIcon, Trash2Icon, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { SetPageTitle } from "../global/set-page-title";

type Props = {
    selectedFilament: Filament;
    setEntryMode: Dispatch<SetStateAction<EntryModeOptions>>;
    selectedAction: FormActions | null;
    setSelectedAction: Dispatch<SetStateAction<FormActions | null>>;
};

type ActionTileProps = {
    title: string;
    subtitle: string;
    icon: LucideIcon;
    iconColor: string;
    action: FormActions;
};

export default function ActionSelector({
    selectedFilament,
    setEntryMode,
    selectedAction,
    setSelectedAction,
}: Props) {

    const actionOptions: ActionTileProps[] = [
        {
            title: "Log Weight",
            subtitle: "Update current spool weight",
            icon: ScaleIcon,
            iconColor: "info",
            action: "logWeight"
        },
        {
            title: "Change Info",
            subtitle: "Edit info related to a filament",
            icon: SettingsIcon,
            iconColor: "success",
            action: "changeInfo"
        },
        {
            title: "View History",
            subtitle: "View scan history for a filament",
            icon: HistoryIcon,
            iconColor: "warning",
            action: "history"
        },
        {
            title: "Archive Filament",
            subtitle: "Remove a filament from use",
            icon: Trash2Icon,
            iconColor: "danger",
            action: "archive"
        }
    ];

    function ActionTile({
        title,
        subtitle,
        icon: Icon,
        iconColor,
        action
    }: ActionTileProps) {
        return (
            <div onClick={() => setSelectedAction(action)}
                className={cn("group hover:ring flex flex-row gap-6 items-center justify-center rounded-lg bg-card p-6 w-full cursor-pointer", iconColor === "danger" ? "hover:ring-danger" : "hover:ring-primary")}
            >
                <div className="bg-foreground/5 rounded-lg p-4">
                    <Icon className={`h-8 w-8 text-${iconColor}`} />
                </div>

                <div className="flex flex-col grow">
                    <span className={cn("text-lg font-bold", iconColor === "danger" ? "text-danger" : "")}>
                        {title}
                    </span>
                    <span className="text-md font-extralight tracking-wide">{subtitle}</span>
                </div>

                <ChevronRightIcon className="" />
            </div>
        );
    }

    return (<>
        <SetPageTitle title={selectedFilament.brand + " " + selectedFilament.color} />

        <AnimatePresence mode="wait">
            <motion.div
                key={`${selectedAction}`}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col items-center w-full"
            >
                <div className="flex flex-col items-center justify-center gap-4 w-4xl">

                    {/* No Action Selected */}
                    {
                        !selectedAction && <>
                            <div className="w-2xl bg-card rounded-lg p-6 border-t-8"
                                style={{ "borderColor": selectedFilament.colorCode }}
                            >
                                <FilamentProgressCard inventory={selectedFilament} />
                            </div>

                            <div className="w-full text-left mt-8 ml-10">
                                <span className="text-base font-light uppercase">Select an action</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {
                                    actionOptions.map(action => {
                                        return <ActionTile
                                            key={action.title}
                                            title={action.title}
                                            subtitle={action.subtitle}
                                            icon={action.icon}
                                            iconColor={action.iconColor}
                                            action={action.action}
                                        />;
                                    })
                                }
                            </div>

                            <Button size={"lg"}
                                onClick={() => setEntryMode("entry")}
                                variant={"outline"}
                                className="self-center mt-12"
                            >
                                <Undo2Icon />
                                <span>Reset</span>
                            </Button>
                        </>
                    }
                </div>
            </motion.div>
        </AnimatePresence>
    </>);
}