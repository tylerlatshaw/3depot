"use client";

import { ColorGroup, FilamentWithHistory } from "@/lib/types";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from "chart.js";
import {
    getInventoryColorGroup,
    INVENTORY_COLOR_GROUP_COLORS,
} from "@/utilities/color-functions";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ColorPieChart({
    inventory,
}: {
    inventory: FilamentWithHistory[];
}) {
    const { resolvedTheme } = useTheme();
    const isMobile = useMediaQuery("(max-width: 767px)");

    const remainingStock = inventory.filter(
        (x) =>
            x.status === "in stock" ||
            x.status === "low stock" ||
            x.status === "empty"
    );

    const colorCounts = remainingStock.reduce<Record<ColorGroup, number>>(
        (acc, filament) => {
            const group = getInventoryColorGroup(filament);

            acc[group] = (acc[group] ?? 0) + 1;

            return acc;
        },
        {} as Record<ColorGroup, number>
    );

    const sortedEntries = Object.entries(colorCounts).sort(
        ([, a], [, b]) => b - a
    );

    const rawLabels = sortedEntries.map(
        ([label]) => label as ColorGroup
    );

    const labels = sortedEntries.map(
        ([label, count]) => `${label}: ${count}`
    );

    const values = sortedEntries.map(
        ([, count]) => count
    );

    const [animatedValues, setAnimatedValues] = useState<number[]>(
        values.map(() => 0)
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnimatedValues(values.map(() => 0));

        const timeout = window.setTimeout(() => {
            setAnimatedValues(values);
        }, 150);

        return () => window.clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.join("-")]);

    const chartData: ChartData<"doughnut"> = {
        labels,
        datasets: [
            {
                data: animatedValues,
                backgroundColor: rawLabels.map(
                    (label) =>
                        INVENTORY_COLOR_GROUP_COLORS[
                        label as ColorGroup
                        ]
                ),
                borderWidth: 4,
                borderColor:
                    resolvedTheme === "dark" ? "#1A1F29" : "#FFFFFF",
                hoverOffset: 12,
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1800,
            easing: "easeOutQuart",
        },
        plugins: {
            legend: {
                position: isMobile ? "bottom" : "right",
                labels: {
                    color:
                        resolvedTheme === "dark" ? "#FFFFFF" : "#1A1F29",
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 24,
                    font: {
                        size: 16,
                    },
                },
            },
            tooltip: {
                titleFont: {
                    size: 16,
                    weight: "bold",
                },
                bodyFont: {
                    size: 16,
                },
                padding: 12,
                boxPadding: 4,
            },
        },
    };

    return (
        <div className="col-span-5 flex flex-col items-center justify-center gap-4 rounded-xl bg-card p-4 md:gap-6 md:px-16 md:py-8 shadow-md">
            <span className="text-xl font-bold">
                Filament Colors
            </span>

            <div className="relative h-80 w-full">
                <Doughnut
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
}