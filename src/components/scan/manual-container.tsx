"use client";

import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "../ui/field";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { sanitizeFilamentId } from "@/utilities/scan-functions";
import { cn } from "@/lib/utils";

type ManualContainerProps = {
    onFilamentIdSubmit: (filamentId: string) => void;
};

export default function ManualContainer({
    onFilamentIdSubmit,
}: ManualContainerProps) {
    const [filamentId, setFilamentId] = useState("");
    const [error, setError] = useState("");

    function handleSubmit() {
        const sanitized = sanitizeFilamentId(filamentId);

        if (!sanitized.success) {
            setError(sanitized.error);
            return;
        }

        setError("");
        onFilamentIdSubmit(sanitized.value);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Field className="flex flex-col gap-6">
                <FieldLabel htmlFor="filament-id">
                    Filament ID
                </FieldLabel>

                <ButtonGroup>
                    <Input
                        id="filament-id"
                        value={filamentId}
                        aria-invalid={!!error}
                        onChange={(event) => {
                            setFilamentId(event.target.value.toUpperCase());
                            setError("");
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                        placeholder="BA-BL"
                        className="px-4 py-6 text-xl font-bold uppercase tracking-widest"
                    />

                    <Button
                        variant="outline"
                        size="lg"
                        className="py-6"
                        aria-invalid={!!error}
                        onClick={handleSubmit}
                    >
                        <ArrowRightIcon
                            className={cn(error && "text-danger")}
                        />
                    </Button>
                </ButtonGroup>

                <div className="flex flex-col gap-2">
                    <FieldDescription>
                        Format: XX-XX or XXXX-XXXX-XXXX
                    </FieldDescription>

                    <div className="min-h-6">
                        {error && (
                            <FieldError className="text-base">
                                {error}
                            </FieldError>
                        )}
                    </div>
                </div>
            </Field>
        </div>
    );
}