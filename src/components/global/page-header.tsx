"use client";

import { usePageHeader } from "@/contexts/page-header-context";
import { Button } from "../ui/button";
import { ScanLineIcon } from "lucide-react";
import dayjs from "dayjs";

export default function PageHeader() {
  const { title } = usePageHeader();

  return (
    <div className="md:sticky top-0 flex flex-row items-center md:h-[86px] px-4 md:px-8 py-4 border-b-2 border-accent bg-background z-10">
      <div className="flex flex-col gap-1 grow">
        <h1 className="text-xl md:text-2xl font-bold">
          {title}
        </h1>

        <span className="hidden md:block text-xs font-light uppercase">
          {dayjs().format("dddd, MMMM D")}
        </span>
      </div>

      <Button
        variant="default"
        size="lg"
        asChild
      >
        <a
          href="/dashboard/scan"
          className="flex items-center gap-2"
        >
          <ScanLineIcon />
          <span>Scan Filament</span>
        </a>
      </Button>
    </div>
  );
}