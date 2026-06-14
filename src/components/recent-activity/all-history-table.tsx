"use client";

import {
    FilamentHistoryItem,
    FilamentWithHistory,
    ScanActions,
} from "@/lib/types";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type Props = {
    inventory: FilamentWithHistory[];
};

type HistoryRow = FilamentHistoryItem & {
    filamentId: string;
    filamentName: string;
};

const actionMap: Record<
    ScanActions,
    {
        display: string;
        textColor: string;
    }
> = {
    created: {
        display: "Created Filament",
        textColor: "text-foreground",
    },
    "log weight": {
        display: "Logged New Weight",
        textColor: "text-info",
    },
    "change info": {
        display: "Info Updated",
        textColor: "text-success",
    },
    removed: {
        display: "Removed",
        textColor: "text-danger",
    },
};

function getPaginationItems(
    currentPage: number,
    totalPages: number
): Array<number | "..."> {
    if (totalPages <= 7) {
        return Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
        return [
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
}

export default function AllHistoryTable({ inventory }: Props) {
    "use no memo";

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "dateCreated",
            desc: true,
        },
    ]);

    const [columnFilters, setColumnFilters] =
        useState<ColumnFiltersState>([]);

    const data: HistoryRow[] = useMemo(
        () =>
            inventory.flatMap((filament) =>
                filament.scanHistory.map((item) => ({
                    ...item,
                    filamentId: filament.id,
                    filamentName: `${filament.brand} ${filament.color}`,
                }))
            ),
        [inventory]
    );

    const columns = useMemo<ColumnDef<HistoryRow>[]>(
        () => [
            {
                accessorKey: "dateCreated",
                header: "Scan Date",
                cell: ({ row }) =>
                    dayjs(row.original.dateCreated).format(
                        "M/D/YYYY h:mm:ss A"
                    ),
                sortingFn: (rowA, rowB) =>
                    new Date(rowA.original.dateCreated).getTime() -
                    new Date(rowB.original.dateCreated).getTime(),
            },
            {
                accessorKey: "filamentName",
                header: "Filament",
                cell: ({ row }) => (
                    <span className="font-semibold">
                        {row.original.filamentName}
                    </span>
                ),
            },
            {
                accessorKey: "filamentId",
                header: "Filament ID",
            },
            {
                accessorKey: "action",
                header: "Action",
                cell: ({ row }) => {
                    const actionInfo = actionMap[row.original.action];

                    return (
                        <span
                            className={`font-bold ${actionInfo.textColor}`}
                        >
                            {actionInfo.display}
                        </span>
                    );
                },
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue || filterValue === "all") {
                        return true;
                    }

                    return row.getValue(columnId) === filterValue;
                },
            },
            {
                accessorKey: "weight",
                header: "Weight",
                cell: ({ row }) =>
                    row.original.weight
                        ? `${row.original.weight} g`
                        : "—",
            },
        ],
        []
    );

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    const filamentIdFilter =
        (table
            .getColumn("filamentId")
            ?.getFilterValue() as string) ?? "";

    const actionFilter =
        (table
            .getColumn("action")
            ?.getFilterValue() as string) ?? "all";

    const currentPage =
        table.getState().pagination.pageIndex + 1;

    const totalPages = table.getPageCount();

    const paginationItems = getPaginationItems(
        currentPage,
        totalPages
    );

    return (
        <div className="flex w-full flex-col gap-6 text-base">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search by ID"
                        value={filamentIdFilter}
                        onChange={(event) =>
                            table
                                .getColumn("filamentId")
                                ?.setFilterValue(event.target.value)
                        }
                        className="px-2 py-3 text-base font-base w-48 !h-[36px] hidden md:flex"
                    />

                    <Select
                        value={actionFilter}
                        onValueChange={(value) =>
                            table
                                .getColumn("action")
                                ?.setFilterValue(value)
                        }
                    >
                        <SelectTrigger className="w-[180px] !h-[36px]">
                            <SelectValue placeholder="Action" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup className="bg-background border border-accent">
                                <SelectItem value="all">
                                    All Actions
                                </SelectItem>

                                {Object.entries(actionMap).map(
                                    ([action, info]) => (
                                        <SelectItem
                                            key={action}
                                            value={action}
                                        >
                                            {info.display}
                                        </SelectItem>
                                    )
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <span className="text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} Records
                </span>
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none"
                                >
                                    <div className="flex items-center gap-2">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        {{
                                            asc: "↑",
                                            desc: "↓",
                                        }[
                                            header.column.getIsSorted() as string
                                        ] ?? null}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No history found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 hidden md:flex">
                    <Select
                        value={String(
                            table.getState().pagination.pageSize
                        )}
                        onValueChange={(value) =>
                            table.setPageSize(Number(value))
                        }
                    >
                        <SelectTrigger className="w-24 !h-[36px]">
                            <SelectValue placeholder="10" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup className="bg-background border border-accent">
                                {[10, 25, 50, 100].map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={String(pageSize)}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="!h-[36px] hover:bg-foreground/20"
                    >
                        <ArrowLeftIcon />
                    </Button>

                    {paginationItems.map((item, index) =>
                        item === "..." ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 text-sm"
                            >
                                ...
                            </span>
                        ) : (
                            <Button
                                key={item}
                                variant={
                                    item === currentPage
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                    table.setPageIndex(item - 1)
                                }
                                className="min-w-8 !h-[36px] border border-foreground hover:bg-foreground/20"
                            >
                                {item}
                            </Button>
                        )
                    )}

                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="!h-[36px] hover:bg-foreground/20"
                    >
                        <ArrowRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}