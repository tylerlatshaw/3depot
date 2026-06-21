"use client";

import { FilamentWithHistory } from "@/lib/types";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function FilamentConsumedChart({
    inventory,
}: {
    inventory: FilamentWithHistory[];
}) {
    const { resolvedTheme } = useTheme();

    const remainingStock = inventory.filter(
        (filament) =>
            filament.status === "in stock" ||
            filament.status === "low stock" ||
            filament.status === "empty"
    );

    const materials = [
        ...new Set(
            remainingStock.map((filament) => filament.material)
        ),
    ].sort();

    const materialStats = materials
        .map((material) => {
            const materialInventory = remainingStock.filter(
                (filament) => filament.material === material
            );

            const remaining = materialInventory.reduce(
                (sum, filament) => sum + filament.remainingWeight,
                0
            );

            const consumed = materialInventory.reduce(
                (sum, filament) => {
                    const originalFilamentWeight =
                        filament.startingWeight -
                        filament.spoolWeight;

                    return (
                        sum +
                        Math.max(
                            originalFilamentWeight -
                            filament.remainingWeight,
                            0
                        )
                    );
                },
                0
            );

            return {
                material,
                remainingKg: remaining / 1000,
                consumedKg: consumed / 1000,
            };
        })
        .sort(
            (a, b) =>
                b.remainingKg + b.consumedKg -
                (a.remainingKg + a.consumedKg)
        );

    const [animatedRemaining, setAnimatedRemaining] = useState<number[]>(
        materialStats.map(() => 0)
    );

    const [animatedConsumed, setAnimatedConsumed] = useState<number[]>(
        materialStats.map(() => 0)
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnimatedRemaining(materialStats.map(() => 0));
        setAnimatedConsumed(materialStats.map(() => 0));

        const timeout = window.setTimeout(() => {
            setAnimatedRemaining(
                materialStats.map((item) => item.remainingKg)
            );

            setAnimatedConsumed(
                materialStats.map((item) => item.consumedKg)
            );
        }, 150);

        return () => window.clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [materialStats.map((item) => item.material).join("-")]);

    const labels = materialStats.map((item) => item.material);

    const chartData: ChartData<"bar"> = {
        labels,
        datasets: [
            {
                label: "Remaining",
                data: animatedRemaining,
                backgroundColor: "#275ed9",
                borderRadius: 8,
                stack: "filament",
            },
            {
                label: "Consumed",
                data: animatedConsumed,
                backgroundColor:
                    resolvedTheme === "dark" ? "#374151" : "#E5E7EB",
                borderRadius: 8,
                stack: "filament",
            },
        ],
    };

    const chartOptions: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color:
                        resolvedTheme === "dark"
                            ? "#FFFFFF"
                            : "#1A1F29",
                    font: {
                        size: 16,
                    },
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    color:
                        resolvedTheme === "dark"
                            ? "#FFFFFF"
                            : "#1A1F29",
                    callback(value) {
                        return `${value}kg`;
                    },
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    color:
                        resolvedTheme === "dark"
                            ? "rgba(255,255,255,.12)"
                            : "rgba(0,0,0,.08)",
                },
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color:
                        resolvedTheme === "dark"
                            ? "#FFFFFF"
                            : "#1A1F29",
                    usePointStyle: true,
                    pointStyle: "rect",
                    padding: 20,
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
                callbacks: {
                    label(context) {
                        return `${context.dataset.label}: ${Number(
                            context.parsed.y
                        ).toFixed(2)} kg`;
                    },
                },
            },
        },
    };

    return (
        <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center gap-4 rounded-xl bg-card p-4 md:gap-6 md:px-16 md:py-8 shadow-md">
            <span className="text-xl font-bold">
                Filament Consumed
            </span>

            <div className="relative h-80 w-full">
                <Bar
                    data={chartData}
                    options={chartOptions}
                />
            </div>
        </div>
    );
}