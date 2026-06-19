"use client";

import { sanitizeFilamentId } from "@/utilities/scan-functions";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { SwitchCameraIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type Props = {
    onFilamentIdSubmit: (filamentId: string) => void;
};

export default function ScannerContainer({
    onFilamentIdSubmit,
}: Props) {
    const [error, setError] = useState("");
    const devices = useDevices();
    const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo>();

    return (
        <div className="relative flex flex-col items-center justify-center gap-2">
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
                    console.error(error?.message);
                    setError(error?.message ?? "Scanner error");
                }}
                formats={[
                    "qr_code",
                    "qr_code_model_1",
                    "qr_code_model_2",
                ]}
                classNames={{
                    container: "peer rounded-lg"
                }}
                sound={false}
                allowMultiple={false}
                constraints={{
                    deviceId: selectedDevice?.deviceId
                }}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"default"}
                        size={"icon"}
                        className="absolute z-50 top-3 right-3"
                    >
                        <SwitchCameraIcon className="p-2 bg-primary shadow rounded-full size-10" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-background border border-accent text-nowrap w-fit">
                    <DropdownMenuGroup>
                        {
                            devices.map((device) => {
                                return <DropdownMenuItem
                                    key={device.deviceId}
                                    onClick={() => setSelectedDevice(device)}
                                    className="w-fit"
                                >
                                    {device.label}
                                </DropdownMenuItem>;
                            })
                        }
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <span className="mt-2 text-base text-foreground">
                Scan the spool&apos;s QR code
            </span>

            {error && (
                <span className="text-danger text-center">
                    {error}
                </span>
            )}
        </div>
    );
}