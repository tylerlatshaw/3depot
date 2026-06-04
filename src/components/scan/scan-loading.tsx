import Loading from "../ui/loading";

export default async function ScanLoading() {

    return (<div className="flex flex-row items-center justify-center w-full h-full">
        <Loading />
    </div>);
}