import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "3Depot Filament Management",
        short_name: "3Depot",
        description: "A web application for managing 3D printing filament inventory and usage.",
        start_url: "/dashboard",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
            {
                "src": "/static/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/static/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
        ],
    };
}