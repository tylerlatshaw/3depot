import {
    CheckCircle2Icon,
    InfoIcon,
    OctagonAlertIcon,
    TriangleAlertIcon,
} from "lucide-react";

import { toast } from "sonner";

type ToastProps = {
    message: string;
    variant: "success" | "warning" | "danger" | "info";
};

const iconMap = {
    success: CheckCircle2Icon,
    warning: TriangleAlertIcon,
    danger: OctagonAlertIcon,
    info: InfoIcon,
} as const;

const colorMap = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    info: "text-info",
} as const;

export function showToast({
    message,
    variant,
}: ToastProps) {
    const Icon = iconMap[variant];

    toast(
        <div className="flex flex-row items-center gap-4 rounded-lg border bg-card p-4 text-base font-semibold">
            <div className="min-w-8">
                <Icon
                    size={32}
                    className={colorMap[variant]}
                />
            </div>

            <span className="text-foreground">
                {message}
            </span>
        </div>,
        {
            duration: 4000,
            icon: null,
            position: "bottom-right",
        }
    );
}