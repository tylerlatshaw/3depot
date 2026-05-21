import { NextRequest, NextResponse } from "next/server";
import { firestore } from "firebase-admin";

import {
    adminDb,
    adminStorage,
} from "@/lib/firebase-admin";

export async function POST(
    request: NextRequest
) {
    try {

        const formData =
            await request.formData();

        const id =
            formData.get("id")?.toString();

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "id is required",
                },
                {
                    status: 400,
                }
            );
        }

        const image =
            formData.get("image") as File | null;

        let swatchImageUrl = "";

        // Upload Image
        if (image && image.size > 0) {

            const bucket =
                adminStorage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

            const extension =
                image.name.split(".").pop() ||
                "jpg";

            const imagePath =
                `filament-swatches/${id}.${extension}`;

            const buffer = Buffer.from(
                await image.arrayBuffer()
            );

            const file =
                bucket.file(imagePath);

            await file.save(buffer, {
                metadata: {
                    contentType: image.type,
                },
            });

            await file.makePublic();

            swatchImageUrl =
                `https://storage.googleapis.com/${bucket.name}/${imagePath}`;
        }

        const docRef = adminDb
            .collection("filament")
            .doc(id);

        const existingDoc =
            await docRef.get();

        const wasInserted =
            !existingDoc.exists;

        const now =
            firestore.FieldValue.serverTimestamp();

        await docRef.set(
            {
                id,

                // Filament Details
                brand:
                    formData
                        .get("brand")
                        ?.toString() ?? "",

                color:
                    formData
                        .get("color")
                        ?.toString() ?? "",

                color_code:
                    formData
                        .get("colorCode")
                        ?.toString() ?? "",

                material:
                    formData
                        .get("material")
                        ?.toString() ?? "",

                tags:
                    formData.get("tags")
                        ? formData
                            .get("tags")!
                            .toString()
                            .split(",")
                            .map((tag) =>
                                tag.trim()
                            )
                        : [],

                // Inventory Data
                status:
                    formData
                        .get("status")
                        ?.toString() ??
                    "in stock",

                percent_remaining:
                    Number(
                        formData.get(
                            "percentRemaining"
                        ) ?? 0
                    ),

                remaining_weight:
                    Number(
                        formData.get(
                            "remainingWeight"
                        ) ?? 0
                    ),

                starting_weight:
                    Number(
                        formData.get(
                            "startingWeight"
                        ) ?? 0
                    ),

                spool_weight:
                    Number(
                        formData.get(
                            "spoolWeight"
                        ) ?? 0
                    ),

                last_scanned:
                    firestore.Timestamp.fromDate(
                        new Date()
                    ),

                date_purchased:
                    formData.get("datePurchased")
                        ? firestore.Timestamp.fromDate(
                            new Date(
                                formData
                                    .get(
                                        "datePurchased"
                                    )!
                                    .toString()
                            )
                        )
                        : null,

                // Swatch
                swatch:
                    Boolean(
                        swatchImageUrl
                    ),

                swatch_image_url:
                    swatchImageUrl,

                // Misc
                notes:
                    formData
                        .get("notes")
                        ?.toString() ?? "",

                // Metadata
                date_created:
                    wasInserted
                        ? now
                        : existingDoc.data()
                            ?.date_created ??
                        now,

                date_modified: now,
            },
            {
                merge: true,
            }
        );

        return NextResponse.json({
            success: true,
            operation:
                wasInserted
                    ? "inserted"
                    : "upserted",
            id,
            swatchImageUrl,
        });

    } catch (error) {

        console.error(
            "Error upserting filament:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error:
                    "Failed to upsert filament",
            },
            {
                status: 500,
            }
        );
    }
}