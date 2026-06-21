export default function AnalyticsLoading() {

    return (<div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full">
        <div className="col-span-1 md:col-span-4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
                <div className="rounded-xl bg-card shadow-md animate-pulse h-44" />
                <div className="rounded-xl bg-card shadow-md animate-pulse h-44" />
                <div className="rounded-xl bg-card shadow-md animate-pulse h-44" />
                <div className="rounded-xl bg-card shadow-md animate-pulse h-44" />
            </div>
        </div>

        <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-6">
            <div className="col-span-5 bg-card rounded-xl h-110 animate-pulse" />
            <div className="col-span-3 bg-card rounded-xl h-110 animate-pulse" />
        </div>

        <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-6">
            <div className="col-span-3 bg-card rounded-xl h-110 animate-pulse" />
            <div className="col-span-5 bg-card rounded-xl h-110 animate-pulse" />
        </div>
    </div>);
}