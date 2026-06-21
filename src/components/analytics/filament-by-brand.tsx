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

export default function FilamentByBrandChart({
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

    const brandStats = Object.values(
        remainingStock.reduce<
            Record<
                string,
                {
                    brand: string;
                    remainingKg: number;
                    consumedKg: number;
                }
            >
        >((acc, filament) => {
            const brand = filament.brand || "Unknown";

            const originalFilamentWeight = Math.max(
                filament.startingWeight - filament.spoolWeight,
                0
            );

            const remainingWeight = Math.max(
                filament.remainingWeight,
                0
            );

            const consumedWeight = Math.max(
                originalFilamentWeight - remainingWeight,
                0
            );

            if (!acc[brand]) {
                acc[brand] = {
                    brand,
                    remainingKg: 0,
                    consumedKg: 0,
                };
            }

            acc[brand].remainingKg += remainingWeight / 1000;
            acc[brand].consumedKg += consumedWeight / 1000;

            return acc;
        }, {})
    )
        .map((item) => ({
            ...item,
            remainingKg: Number(item.remainingKg.toFixed(2)),
            consumedKg: Number(item.consumedKg.toFixed(2)),
            totalKg: Number(
                (item.remainingKg + item.consumedKg).toFixed(2)
            ),
        }))
        .sort((a, b) => b.totalKg - a.totalKg)
        .sort(
            (a, b) =>
                b.totalKg - a.totalKg ||
                b.remainingKg - a.remainingKg
        )
        .slice(0, 10);

    const labels = brandStats.map((item) => item.brand);
    const remainingValues = brandStats.map((item) => item.remainingKg);
    const consumedValues = brandStats.map((item) => item.consumedKg);

    const [animatedRemaining, setAnimatedRemaining] = useState<number[]>(
        remainingValues.map(() => 0)
    );

    const [animatedConsumed, setAnimatedConsumed] = useState<number[]>(
        consumedValues.map(() => 0)
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnimatedRemaining(remainingValues.map(() => 0));
        setAnimatedConsumed(consumedValues.map(() => 0));

        const timeout = window.setTimeout(() => {
            setAnimatedRemaining(remainingValues);
            setAnimatedConsumed(consumedValues);
        }, 150);

        return () => window.clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labels.join("-")]);

    const chartData: ChartData<"bar"> = {
        labels,
        datasets: [
            {
                label: "Remaining",
                data: animatedRemaining,
                backgroundColor: "#275ed9",
                borderRadius: 8,
                stack: "brand",
            },
            {
                label: "Consumed",
                data: animatedConsumed,
                backgroundColor:
                    resolvedTheme === "dark" ? "#374151" : "#E5E7EB",
                borderRadius: 8,
                stack: "brand",
            },
        ],
    };

    const chartOptions: ChartOptions<"bar"> = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1200,
            easing: "easeOutQuart",
        },
        scales: {
            x: {
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
                },
                grid: {
                    color:
                        resolvedTheme === "dark"
                            ? "rgba(255,255,255,.12)"
                            : "rgba(0,0,0,.08)",
                },
            },
            y: {
                stacked: true,
                ticks: {
                    color:
                        resolvedTheme === "dark"
                            ? "#FFFFFF"
                            : "#1A1F29",
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    display: false,
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
                        size: 14,
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
                            context.parsed.x
                        ).toFixed(2)} kg`;
                    },
                },
            },
        },
    };

    return (
        <div className="col-span-3 flex flex-col items-center justify-center gap-4 rounded-xl bg-card p-4 md:gap-6 md:px-4 md:py-8 shadow-md">
            <span className="text-xl font-bold">
                Filament by Brand (Top 10)
            </span>

            <div className="relative h-96 w-full">
                <Bar
                    data={chartData}
                    options={chartOptions}
                />
            </div>
        </div>
    );
}