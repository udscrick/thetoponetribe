import { UserButton, auth } from "@clerk/nextjs";
import NavbarRoutes from "./navbar-routes";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
    const { userId } = auth();
    if(!userId) {
        redirect('/sign-in')
    }
    const userStores = await prismadb.store.findMany({
        where: {
            userId
        }
    })
    console.log("User stores: ", userStores)
    return(
        <div className="border-b">
            <div className="flex items-center p-4">
                <StoreSwitcher items={userStores}/>
                <NavbarRoutes className="ml-4"/>
                <div className="ml-auto flex items-center">
                <UserButton afterSignOutUrl="/"/>
            </div>
            </div>
            
        </div>
    );
}

export default Navbar;