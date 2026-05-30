import { Spinner } from "./spinner";

export default function Loading() {
    return (<>
        <div className="flex flex-row items-center justify-center gap-4 h-full text-xl font-bold">
            <Spinner className="size-8" />
            <span>Loading...</span>
        </div>
    </>)
}