import { FileX2Icon } from "lucide-react";

export default function NoData() {
    return <div className="flex flex-col items-center justify-center gap-3 text-accent">
        <FileX2Icon size={64} />
        <span className="text-2xl font-bold">No Data</span>
    </div>;
}