import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
);


const app =
    getApps().length === 0
        ? initializeApp({
            credential: cert(serviceAccount),

            storageBucket:
                process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        })
        : getApps()[0];

export const adminAuth = getAuth(app);

export const adminDb = getFirestore(app);

export const adminStorage = getStorage(app);