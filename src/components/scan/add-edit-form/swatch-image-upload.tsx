"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { UploadIcon, XIcon } from "lucide-react";

import { Button } from "../../ui/button";

type Props = {
    imageUrl?: string | null;
    onChange: (file: File | null) => void;
    onRemove: (removed: boolean) => void;
};

export default function SwatchImageUpload({
    imageUrl,
    onChange,
    onRemove,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [uploadedPreviewUrl, setUploadedPreviewUrl] =
        useState<string | null>(null);

    const [imageRemoved, setImageRemoved] = useState(false);

    const previewUrl = imageRemoved
        ? uploadedPreviewUrl
        : uploadedPreviewUrl ?? imageUrl ?? null;

    function handleFile(file: File | null) {
        if (!file) return;

        if (uploadedPreviewUrl) {
            URL.revokeObjectURL(uploadedPreviewUrl);
        }

        const url = URL.createObjectURL(file);

        setUploadedPreviewUrl(url);
        setImageRemoved(false);
        onChange(file);
        onRemove(false);
    }

    function clearImage() {
        if (uploadedPreviewUrl) {
            URL.revokeObjectURL(uploadedPreviewUrl);
        }

        setUploadedPreviewUrl(null);
        setImageRemoved(true);
        onChange(null);
        onRemove(true);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(event) =>
                    handleFile(event.target.files?.[0] ?? null)
                }
            />

            <Button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                    event.preventDefault();
                    handleFile(event.dataTransfer.files?.[0] ?? null);
                }}
                className="relative flex min-h-64 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-accent bg-card transition hover:border-primary"
            >
                {previewUrl ? (
                    <>
                        <Image
                            src={previewUrl}
                            alt="Swatch Preview"
                            fill
                            className="object-contain p-4"
                            unoptimized
                        />

                        <Button
                            type="button"
                            variant="danger"
                            size="icon"
                            className="absolute right-3 top-3 z-10 !bg-danger/25"
                            onClick={(event) => {
                                event.stopPropagation();
                                clearImage();
                            }}
                        >
                            <XIcon />
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                        <UploadIcon className="size-8" />

                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-base">
                                Drop an image or click to browse
                            </span>

                            <span className="text-sm font-light uppercase tracking-widest">
                                PNG, JPG, WEBP
                            </span>
                        </div>
                    </div>
                )}
            </Button>
        </>
    );
}