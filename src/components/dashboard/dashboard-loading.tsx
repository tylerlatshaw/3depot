export default async function DashboardLoading() {

    return (<>
        <div className="w-full flex flex-col gap-4 md:gap-6">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {
                    [1, 2, 3, 4].map(i => {
                        return <div key={i} className="w-full h-44 animate-pulse rounded-xl bg-card shadow-md" />;
                    })
                }
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full min-h-[600px] animate-pulse rounded-xl bg-card shadow-md" />
                <div className="w-full min-h-[600px] animate-pulse rounded-xl bg-card shadow-md" />
            </div>
        </div>
    </>);
}