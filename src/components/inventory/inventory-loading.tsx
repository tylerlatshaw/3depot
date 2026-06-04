export default async function InventoryLoading() {

    return (<>
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                <div className="flex min-w-0 grow flex-row items-center gap-2">

                    <div className="w-18 h-8 animate-pulse rounded-md bg-card"></div>
                    <div className="w-24 h-8 animate-pulse rounded-md bg-card"></div>
                    <div className="w-20 h-8 animate-pulse rounded-md bg-card"></div>
                    <div className="w-22 h-8 animate-pulse rounded-md bg-card"></div>

                </div>
            </div>

            <hr className="border border-accent" />

            <div className="grid grid-cols-3 gap-6">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
                        return <div key={i} className="w-full h-48 animate-pulse rounded-md bg-card shadow-md"></div>;
                    })
                }
            </div>
        </div>
    </>);
}