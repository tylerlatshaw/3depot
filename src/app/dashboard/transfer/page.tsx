"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showToast } from "@/components/ui/toast";
import { SetPageTitle } from "@/components/global/set-page-title";
import {
    DownloadIcon,
    UploadIcon,
    CopyIcon,
    AlertTriangleIcon,
    OctagonAlertIcon,
} from "lucide-react";
import PageHeader from "@/components/global/page-header";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const PRODUCTION_EXPORT_URL = process.env.NEXT_PUBLIC_PROD_URL + "/api/admin/export-firestore";

export default function ImportFirestorePage() {
    const [apiKey, setApiKey] = useState("");
    const [payload, setPayload] = useState("");
    const [exporting, setExporting] = useState(false);
    const [importing, setImporting] = useState(false);

    async function handleExport() {
        if (!apiKey.trim()) {
            showToast({
                message: "API key is required",
                variant: "danger",
            });

            return;
        }

        try {
            setExporting(true);

            const response = await fetch(PRODUCTION_EXPORT_URL, {
                method: "GET",
                headers: {
                    "x-api-key": apiKey,
                },
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(
                    result.error ?? "Export failed"
                );
            }

            setPayload(
                JSON.stringify(result.data ?? result, null, 2)
            );

            showToast({
                message: "Production data exported",
                variant: "success",
            });
        } catch (error) {
            console.error(error);

            showToast({
                message:
                    error instanceof Error
                        ? error.message
                        : "Export failed",
                variant: "danger",
            });
        } finally {
            setExporting(false);
        }
    }

    async function handleCopy() {
        if (!payload.trim()) {
            showToast({
                message: "Nothing to copy",
                variant: "danger",
            });

            return;
        }

        await navigator.clipboard.writeText(payload);

        showToast({
            message: "Export JSON copied",
            variant: "success",
        });
    }

    async function handleImport() {
        if (!apiKey.trim()) {
            showToast({
                message: "API key is required",
                variant: "danger",
            });

            return;
        }

        if (!payload.trim()) {
            showToast({
                message: "Export JSON is required",
                variant: "danger",
            });

            return;
        }

        let parsedPayload;

        try {
            const parsed = JSON.parse(payload);

            parsedPayload = parsed.data ?? parsed;
        } catch {
            showToast({
                message: "Invalid JSON",
                variant: "danger",
            });

            return;
        }

        try {
            setImporting(true);

            const response = await fetch(
                "/api/admin/import-firestore",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": apiKey,
                    },
                    body: JSON.stringify(parsedPayload),
                }
            );

            const result = await response.json();

            if (!result.success) {
                throw new Error(
                    result.error ?? "Import failed"
                );
            }

            showToast({
                message:
                    "Firestore import completed successfully",
                variant: "success",
            });
        } catch (error) {
            console.error(error);

            showToast({
                message:
                    error instanceof Error
                        ? error.message
                        : "Import failed",
                variant: "danger",
            });
        } finally {
            setImporting(false);
        }
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col">
            <PageHeader />

            <main className="min-h-0 flex-1 overflow-auto">
                <SetPageTitle title="Transfer Production Data" />

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6">
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-8">

                            {/* Warning */}
                            <div className="rounded-xl border border-warning bg-warning/10 p-6 shadow-md max-w-lg">
                                <div className="mb-4 flex items-center gap-3 text-warning text-base font-base">
                                    <AlertTriangleIcon className="size-6" />

                                    <h2 className="text-xl font-bold">
                                        Warning
                                    </h2>
                                </div>

                                <span>
                                    Transferring data will pull down the production database and replace the following collections:
                                </span>

                                <ul className="mt-4 list-disc pl-6 font-mono">
                                    <li>filament</li>
                                    <li>scan_history</li>
                                    <li>materials</li>
                                    <li>brands</li>
                                    <li>contact_messages</li>
                                </ul>

                                <p className="mt-4 font-bold">
                                    Only run the transfer process in the development environment.
                                </p>
                            </div>

                            {/* Export Prod */}
                            <div className="grow rounded-xl border border-accent bg-card p-6 shadow-md">
                                <div className="mb-4 flex items-center gap-3">
                                    <DownloadIcon className="size-5" />

                                    <h2 className="text-xl font-bold">
                                        Export Production Data
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-4 text-sm">
                                    <p>
                                        Enter your transfer API key, then export
                                        production Firestore data directly from the
                                        production route.
                                    </p>

                                    <code className="rounded-md border border-accent bg-background p-3 font-mono text-xs break-all md:text-sm">
                                        {PRODUCTION_EXPORT_URL}
                                    </code>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold uppercase">
                                            API Key
                                        </label>

                                        <Input
                                            type="password"
                                            value={apiKey}
                                            onChange={(event) =>
                                                setApiKey(event.target.value)
                                            }
                                            placeholder="Firestore transfer API key"
                                        />
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            variant="default"
                                            className="w-fit"
                                            onClick={handleExport}
                                            disabled={exporting}
                                        >
                                            <DownloadIcon />

                                            <span>
                                                {exporting
                                                    ? "Exporting..."
                                                    : "Export Database"}
                                            </span>
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="w-fit"
                                            onClick={handleCopy}
                                            disabled={!payload}
                                        >
                                            <CopyIcon />

                                            <span>Copy JSON</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Import to Dev */}
                        <div className="rounded-xl bg-card p-6 shadow-md">
                            <div className="mb-4 flex items-center gap-3">
                                <UploadIcon className="size-5" />

                                <h2 className="text-xl font-bold">
                                    Import Production Data
                                </h2>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase">
                                        Exported Production JSON
                                    </label>

                                    <textarea
                                        value={payload}
                                        onChange={(event) =>
                                            setPayload(event.target.value)
                                        }
                                        placeholder="Exported production JSON will appear here..."
                                        className="min-h-[500px] resize-y rounded-md border border-accent bg-background p-4 font-mono text-xs outline-none md:text-sm"
                                    />
                                </div>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            disabled={importing || exporting}
                                            size="lg"
                                            className="w-fit bg-danger"
                                        >
                                            <UploadIcon />

                                            <span>
                                                {importing
                                                    ? "Importing..."
                                                    : "Import Database"}
                                            </span>
                                        </Button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent className="max-w-2xl p-4">
                                        <AlertDialogHeader className="flex flex-col gap-3 p-2 pb-4 text-base font-base">
                                            <AlertDialogTitle className="flex items-center gap-2 text-xl font-bold text-danger">
                                                <OctagonAlertIcon className="size-6" />
                                                Replace Development Database?
                                            </AlertDialogTitle>

                                            <AlertDialogDescription className="flex flex-col gap-4">
                                                This will delete and recreate all data in
                                                the development Firestore database,
                                                including the following collections:
                                                <ul className="list-disc pl-6 font-mono">
                                                    <li>filament</li>
                                                    <li>scan_history</li>
                                                    <li>materials</li>
                                                    <li>brands</li>
                                                    <li>contact_messages</li>
                                                </ul>
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter className="flex flex-row gap-4">
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>

                                            <AlertDialogAction
                                                onClick={handleImport}
                                                variant="danger"
                                                className="text-base"
                                            >
                                                Import Data
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}