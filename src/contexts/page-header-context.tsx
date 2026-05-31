"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

type PageHeaderContextType = {
    title: string;
    setTitle: (title: string) => void;
};

const PageHeaderContext =
    createContext<PageHeaderContextType | null>(null);

export function PageHeaderProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [title, setTitle] = useState("");

    return (
        <PageHeaderContext.Provider
            value={{
                title,
                setTitle,
            }}
        >
            {children}
        </PageHeaderContext.Provider>
    );
}

export function usePageHeader() {
    const context = useContext(PageHeaderContext);

    if (!context) {
        throw new Error(
            "usePageHeader must be used within a PageHeaderProvider"
        );
    }

    return context;
}