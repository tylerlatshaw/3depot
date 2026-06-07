import { useEffect, useState } from "react";

export function useIsMobileOrTablet() {
    const [isMobileOrTablet, setIsMobileOrTablet] =
        useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(max-width: 1024px)"
        );

        const update = () =>
            setIsMobileOrTablet(mediaQuery.matches);

        update();

        mediaQuery.addEventListener(
            "change",
            update
        );

        return () =>
            mediaQuery.removeEventListener(
                "change",
                update
            );
    }, []);

    return isMobileOrTablet;
}