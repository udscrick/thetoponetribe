import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: {
        storeid: string;
    };
}
const DashboardPage:React.FC<DashboardPageProps> = async({
    params
}) => {
    //Get storeid from params
    //Use store id to get store info from db
    //Print store name

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeid
        }
    })
    return(
        <div>
            <h1>Welcome to {store?.name}</h1>
        </div>
    )
}

export default DashboardPage;