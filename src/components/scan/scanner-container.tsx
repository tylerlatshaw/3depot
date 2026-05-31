"use client";

import { sanitizeFilamentId } from "@/utilities/scan-functions";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

type Props = {
    onFilamentIdSubmit: (filamentId: string) => void;
};

export default function ScannerContainer({
    onFilamentIdSubmit,
}: Props) {
    const [error, setError] = useState("");

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Scanner
                onScan={(result) => {
                    const rawValue = result[0]?.rawValue;

                    if (!rawValue) return;

                    const sanitized = sanitizeFilamentId(rawValue);

                    if (!sanitized.success) {
                        setError(sanitized.error);
                        return;
                    }

                    setError("");

                    onFilamentIdSubmit(sanitized.value);
                }}
                onError={(error) => {
                    console.log(error?.message);
                    setError(error?.message ?? "Scanner error");
                }}
                formats={[
                    "qr_code",
                    "qr_code_model_1",
                    "qr_code_model_2",
                ]}
                classNames={{
                    container: "rounded-lg",
                }}
                sound={false}
                allowMultiple={false}
            />

            <span className="mt-2 text-base text-foreground">
                Scan the spool&apos;s QR code
            </span>

            {error && (
                <span className="text-danger">
                    {error}
                </span>
            )}
        </div>
    );
}