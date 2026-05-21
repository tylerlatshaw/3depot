import { Button } from "./../ui/button"
import Link from "next/link"
import { ScanLineIcon } from "lucide-react"
import dayjs from "dayjs"

export default function PageHeader({ pageName }: { pageName: string }) {
  return (
    <div className="sticky top-0 flex flex-row items-center h-[86px] px-8 py-4 border-b-2 border-accent bg-background z-10">
      <div className="flex flex-col gap-1 grow">
        <h1 className="text-2xl font-bold">{pageName}</h1>
        <span className="text-xs font-light uppercase">{dayjs().format("dddd, MMMM D")} &#x2022; Last Scan: {dayjs("12/31/1900").format("M/D/YY h:mm A")}</span>
      </div>
      <div>
        <Button
          variant="default"
          size="lg"
          asChild
        >
          <Link
            href="/dashboard/scan"
            className="flex items-center gap-2"
          >
            <ScanLineIcon />
            <span>Scan Filament</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}