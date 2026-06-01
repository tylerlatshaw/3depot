import { protectRoute } from "@/lib/auth/protect-route";
import { NextRequest, NextResponse } from "next/server";
import {
    FieldValue,
    type DocumentData,
} from "firebase-admin/firestore";
import { adminDb, adminStorage } from "@/lib/firebase-admin";
import { ScanActions } from "@/lib/types";

async function copySubcollection({
    fromPath,
    toPath,
    subcollectionName,
}: {
    fromPath: string;
    toPath: string;
    subcollectionName: string;
}) {
    const sourceSnapshot = await adminDb
        .doc(fromPath)
        .collection(subcollectionName)
        .get();

    const targetCollection = adminDb
        .doc(toPath)
        .collection(subcollectionName);

    await Promise.all(
        sourceSnapshot.docs.map((doc) =>
            targetCollection.doc(doc.id).set(doc.data())
        )
    );
}

async function deleteSubcollection({
    docPath,
    subcollectionName,
}: {
    docPath: string;
    subcollectionName: string;
}) {
    const snapshot = await adminDb
        .doc(docPath)
        .collection(subcollectionName)
        .get();

    await Promise.all(
        snapshot.docs.map((doc) => doc.ref.delete())
    );
}

export async function POST(request: NextRequest) {

    if (!(await protectRoute(request))) {
        return NextResponse.json(
            {
                success: false,
                error: "Unauthorized",
            },
            { status: 401 }
        );
    }

    try {
        const formData = await request.formData();

        const filamentRaw = formData.get("filament");
        const swatchImage =
            formData.get("swatchImage") as File | null;

        const removeSwatchImage =
            formData.get("removeSwatchImage") === "true";

        if (!filamentRaw || typeof filamentRaw !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Filament data is required",
                },
                { status: 400 }
            );
        }

        const filament = JSON.parse(filamentRaw);

        if (!filament.id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Filament ID is required",
                },
                { status: 400 }
            );
        }

        const oldDocId = filament.uuid || filament.id;
        const newDocId = filament.id;

        const oldDocRef = adminDb
            .collection("filament")
            .doc(oldDocId);

        const newDocRef = adminDb
            .collection("filament")
            .doc(newDocId);

        const oldDocSnapshot = await oldDocRef.get();
        const oldData = oldDocSnapshot.data();

        const isNew = !oldDocSnapshot.exists;
        const idChanged = oldDocId !== newDocId;

        let existingData = oldData;

        if (idChanged && oldDocSnapshot.exists) {
            existingData = oldData;
        }

        let swatchImageUrl =
            existingData?.swatch_image_url ??
            filament.swatchImageUrl ??
            "";

        if (swatchImage && swatchImage.size > 0) {
            const bucket = adminStorage.bucket();

            const extension =
                swatchImage.type.split("/")[1] || "png";

            const filePath = `filament-swatches/${newDocId}.${extension}`;

            const buffer = Buffer.from(
                await swatchImage.arrayBuffer()
            );

            const file = bucket.file(filePath);

            await file.save(buffer, {
                metadata: {
                    contentType: swatchImage.type,
                },
            });

            await file.makePublic();

            swatchImageUrl =
                `https://storage.googleapis.com/${bucket.name}/${filePath}`;
        }

        if (removeSwatchImage) {
            swatchImageUrl = "";
        }

        const startingWeight = Number(
            filament.startingWeight ?? 0
        );

        const remainingWeight = Number(
            filament.remainingWeight ?? startingWeight
        );

        const percentRemaining =
            startingWeight > 0
                ? Number(
                    (
                        (remainingWeight / startingWeight) *
                        100
                    ).toFixed(1)
                )
                : 0;

        const now = FieldValue.serverTimestamp();

        const newData: DocumentData = {
            id: newDocId,

            brand: filament.brand ?? "",
            color: filament.color ?? "",
            color_code: filament.colorCode ?? "",
            tags: Array.isArray(filament.tags) ? filament.tags : [],
            material: filament.material ?? "",

            status: filament.status ?? "in stock",
            percent_remaining: percentRemaining,
            remaining_weight: remainingWeight,
            starting_weight: startingWeight,
            spool_weight: Number(filament.spoolWeight ?? 0),

            last_scanned:
                existingData?.last_scanned ?? now,

            date_purchased:
                filament.datePurchased
                    ? new Date(filament.datePurchased)
                    : null,

            swatch: Boolean(filament.swatch),
            swatch_image_url: swatchImageUrl,
            notes: filament.notes ?? "",

            date_created:
                isNew
                    ? now
                    : existingData?.date_created ?? now,

            date_modified: now,
        };

        await newDocRef.set(newData, {
            merge: true,
        });

        if (idChanged && oldDocSnapshot.exists) {
            await copySubcollection({
                fromPath: `filament/${oldDocId}`,
                toPath: `filament/${newDocId}`,
                subcollectionName: "scan_history",
            });
        }

        const changes: string[] = [];

        let action: ScanActions | null = null;

        if (isNew) {
            action = "created";
            changes.push("Filament created");
        } else if (
            existingData?.remaining_weight !== remainingWeight
        ) {
            action = "log weight";
            changes.push(
                `Weight changed from ${existingData?.remaining_weight ?? 0}g to ${remainingWeight}g`
            );
        } else {
            const infoFieldsChanged =
                existingData?.id !== newDocId ||
                existingData?.brand !== filament.brand ||
                existingData?.color !== filament.color ||
                existingData?.color_code !== filament.colorCode ||
                existingData?.material !== filament.material ||
                existingData?.status !== filament.status ||
                existingData?.starting_weight !== startingWeight ||
                existingData?.spool_weight !== Number(filament.spoolWeight ?? 0) ||
                existingData?.swatch !== Boolean(filament.swatch) ||
                existingData?.swatch_image_url !== swatchImageUrl ||
                existingData?.notes !== filament.notes;

            if (infoFieldsChanged || swatchImage || removeSwatchImage) {
                action = "change info";
                changes.push("Filament info changed");
            }
        }

        if (action) {
            await newDocRef
                .collection("scan_history")
                .doc(new Date().toISOString())
                .set({
                    action,
                    notes: changes.join(" | "),
                    weight: remainingWeight,
                    date_created: now,
                    date_modified: now,
                });
        }

        if (idChanged && oldDocSnapshot.exists) {
            await deleteSubcollection({
                docPath: `filament/${oldDocId}`,
                subcollectionName: "scan_history",
            });

            await oldDocRef.delete();
        }

        return NextResponse.json({
            success: true,
            operation: isNew
                ? "inserted"
                : idChanged
                    ? "renamed"
                    : "updated",
            uuid: newDocId,
            id: newDocId,
            swatchImageUrl,
        });
    } catch (error) {
        console.error("Error upserting filament:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to upsert filament",
            },
            { status: 500 }
        );
    }
}