"use client";

import { FilamentWithHistory } from "@/lib/types";
import {
    CategoryScale,
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function ConsumptionTrendChart({
    inventory,
}: {
    inventory: FilamentWithHistory[];
}) {
    const { resolvedTheme } = useTheme();

    const monthBuckets = new Map<string, number>();

    for (let i = 5; i >= 0; i--) {
        monthBuckets.set(
            dayjs().subtract(i, "month").format("MMM"),
            0
        );
    }

    const startDate = dayjs()
        .subtract(5, "month")
        .startOf("month");

    inventory.forEach((filament) => {
        const weightLogs = filament.scanHistory
            .filter(
                (item) =>
                    item.action === "log weight" &&
                    typeof item.weight === "number"
            )
            .sort(
                (a, b) =>
                    new Date(a.dateCreated).getTime() -
                    new Date(b.dateCreated).getTime()
            );

        for (let i = 1; i < weightLogs.length; i++) {
            const previous = weightLogs[i - 1];
            const current = weightLogs[i];

            if (
                typeof previous.weight !== "number" ||
                typeof current.weight !== "number"
            ) {
                continue;
            }

            const consumed = previous.weight - current.weight;

            if (consumed <= 0) {
                continue;
            }

            const currentDate = dayjs(current.dateCreated);

            if (currentDate.isBefore(startDate)) {
                continue;
            }

            const month = currentDate.format("MMM");

            monthBuckets.set(
                month,
                (monthBuckets.get(month) ?? 0) + consumed
            );
        }
    });

    const labels = [...monthBuckets.keys()];

    const values = [...monthBuckets.values()].map((grams) =>
        Number((grams / 1000).toFixed(2))
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

    const chartData: ChartData<"line"> = {
        labels,
        datasets: [
            {
                label: "Consumed",
                data: animatedValues,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 7,
                borderWidth: 3,
                borderColor: "#275ED9",
                backgroundColor: "#275ED930",
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1200,
            easing: "easeOutQuart",
        },
        plugins: {
            legend: {
                display: false,
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
                    labelColor() {
                        return {
                            borderColor: "#bfceef",
                            backgroundColor: "#2563EB",
                            borderWidth: 2,
                        };
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color:
                        resolvedTheme === "dark" ? "#FFFFFF" : "#275ed9",
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color:
                        resolvedTheme === "dark" ? "#FFFFFF" : "#275ed9",
                    callback(value) {
                        return `${value}kg`;
                    },
                },
                grid: {
                    color:
                        resolvedTheme === "dark"
                            ? "rgba(255,255,255,.10)"
                            : "rgba(0,0,0,.08)",
                },
            },
        },
    };

    return (
        <div className="col-span-5 flex flex-col items-center justify-center gap-4 rounded-xl bg-card p-4 md:gap-6 md:p-8 shadow-md">
            <span className="text-xl font-bold">
                Filament Consumption By Month
            </span>

            <div className="relative h-96 w-full">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}