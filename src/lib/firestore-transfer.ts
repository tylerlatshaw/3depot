import {
    Timestamp,
    type DocumentData,
} from "firebase-admin/firestore";

export type FirestoreTransferPayload = {
    exportedAt: string;
    collections: {
        filament: Record<
            string,
            {
                data: Record<string, unknown>;
                scan_history: Record<string, Record<string, unknown>>;
            }
        >;
        materials: Record<string, Record<string, unknown>>;
        brands: Record<string, Record<string, unknown>>;
        contact_messages: Record<string, Record<string, unknown>>;
    };
};

export function verifyTransferApiKey(request: Request) {
    const providedKey = request.headers.get("x-api-key");
    const expectedKey = process.env.FIRESTORE_TRANSFER_API_KEY;

    return Boolean(
        expectedKey &&
        providedKey &&
        providedKey === expectedKey
    );
}

export function serializeFirestoreData(
    data: DocumentData
): Record<string, unknown> {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
            key,
            serializeValue(value),
        ])
    );
}

function serializeValue(value: unknown): unknown {
    if (value instanceof Timestamp) {
        return {
            __type: "timestamp",
            value: value.toDate().toISOString(),
        };
    }

    if (value instanceof Date) {
        return {
            __type: "date",
            value: value.toISOString(),
        };
    }

    if (Array.isArray(value)) {
        return value.map(serializeValue);
    }

    if (
        value &&
        typeof value === "object" &&
        value.constructor === Object
    ) {
        return Object.fromEntries(
            Object.entries(value).map(([key, nestedValue]) => [
                key,
                serializeValue(nestedValue),
            ])
        );
    }

    return value;
}

export function deserializeFirestoreData(
    data: Record<string, unknown>
): Record<string, unknown> {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
            key,
            deserializeValue(value),
        ])
    );
}

function deserializeValue(value: unknown): unknown {
    if (
        value &&
        typeof value === "object" &&
        "__type" in value &&
        "value" in value
    ) {
        const typedValue = value as {
            __type: string;
            value: string;
        };

        if (
            typedValue.__type === "timestamp" ||
            typedValue.__type === "date"
        ) {
            return Timestamp.fromDate(new Date(typedValue.value));
        }
    }

    if (Array.isArray(value)) {
        return value.map(deserializeValue);
    }

    if (
        value &&
        typeof value === "object" &&
        value.constructor === Object
    ) {
        return Object.fromEntries(
            Object.entries(value).map(([key, nestedValue]) => [
                key,
                deserializeValue(nestedValue),
            ])
        );
    }

    return value;
}