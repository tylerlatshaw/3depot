"use client";

import { EntryModeOptions, Filament, FilamentHistoryItem } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../ui/table";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { Undo2Icon } from "lucide-react";
import { authenticatedFetch } from "@/lib/auth/authenticated-fetch";

type Props = {
    selectedFilament: Filament;
    setEntryMode: Dispatch<SetStateAction<EntryModeOptions>>;
};

export default function HistoryTable({
    selectedFilament,
    setEntryMode
}: Props) {
    const [history, setHistory] = useState<FilamentHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const actionMap = {
        "created": {
            display: "Created Filament",
            textColor: "text-foreground",
        },
        "log weight": {
            display: "Logged New Weight",
            textColor: "text-info",
        },
        "change status": {
            display: "Status Updated",
            textColor: "text-warning",
        },
        "change info": {
            display: "Info Updated",
            textColor: "text-success",
        },
        "removed": {
            display: "Removed",
            textColor: "text-danger",
        },
    } as const;

    useEffect(() => {
        async function getHistory() {
            try {
                setLoading(true);
                setError("");

                const response = await authenticatedFetch(`/api/get-history-by-id?id=${selectedFilament.id}`, {
                    cache: "no-store",
                });

                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.error);
                }

                setHistory(result.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load history.");
            } finally {
                setLoading(false);
            }
        }

        getHistory();
    }, [selectedFilament.id]);

    if (loading) {
        return <div className="text-xl font-bold">Loading history...</div>;
    }

    if (error) {
        return <div className="text-xl font-bold text-danger">{error}</div>;
    }

    return (
        <div className="flex w-full md:w-2xl flex-col items-center justify-center gap-8 text-base font-base pb-8">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Scan Date</TableHead>
                        <TableHead>Filament ID</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Weight</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {history.map((item) => {
                        const actionInfo = actionMap[item.action];

                        return <TableRow key={item.id}>
                            <TableCell>
                                {dayjs(item.dateCreated).format("M/D/YYYY h:mm:ss A")}
                            </TableCell>

                            <TableCell>{selectedFilament.id}</TableCell>

                            <TableCell>
                                <span className={`font-bold ${actionInfo.textColor}`}>
                                    {actionInfo.display}
                                </span>
                            </TableCell>

                            <TableCell>
                                {item.weight ? `${item.weight} g` : "—"}
                            </TableCell>
                        </TableRow>;
                    })}
                </TableBody>
            </Table>

            <Button size={"lg"}
                onClick={() => setEntryMode("entry")}
                variant={"outline"}
                className="self-center"
            >
                <Undo2Icon />
                <span>Reset</span>
            </Button>
        </div>
    );
}