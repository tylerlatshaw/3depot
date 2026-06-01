import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

function getCurrentUser() {
    return new Promise<typeof auth.currentUser>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

export async function authenticatedFetch(
    input: RequestInfo | URL,
    init?: RequestInit
) {
    const user = auth.currentUser ?? await getCurrentUser();

    if (!user) {
        throw new Error("Not signed in");
    }

    const token = await user.getIdToken();

    return fetch(input, {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: `Bearer ${token}`,
        },
    });
}