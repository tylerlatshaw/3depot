"use client";

import { sanitizeFilamentId } from "@/utilities/scan-functions";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

type ScanData = {
    rawValue: string;
    format: string;
};

type ScannerContainerProps = {
    onFilamentIdSubmit: (filamentId: string) => void;
};

export default function ScannerContainer({
    onFilamentIdSubmit,
}: ScannerContainerProps) {
    const [scannedCode, setScannedCode] = useState<ScanData>();
    const [error, setError] = useState("");

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Scanner
                onScan={(result) => {
                    const rawValue = result[0]?.rawValue;

                    if (!rawValue) return;

                    const sanitized = sanitizeFilamentId(rawValue);

                    if (!sanitized.success) {
                        setScannedCode(undefined);
                        setError(sanitized.error);
                        return;
                    }

                    setError("");

                    setScannedCode({
                        rawValue: sanitized.value,
                        format: result[0].format,
                    });

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

            {scannedCode && (
                <span className="text-info">
                    {scannedCode.rawValue}
                </span>
            )}
        </div>
    );
}