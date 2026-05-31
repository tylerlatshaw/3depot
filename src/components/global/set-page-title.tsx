"use client";

import { useEffect } from "react";
import { usePageHeader } from "@/contexts/page-header-context";

export function SetPageTitle({ title }: { title: string }) {
    const { setTitle } = usePageHeader();

    useEffect(() => {
        setTitle(title);
    }, [title, setTitle]);

    return null;
}