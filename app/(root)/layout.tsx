import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const SetUpPageLayout = async({
    children
}: {
    children: React.ReactNode
}) =>{
    //No user id => Redirect to signin page
    const { userId } = auth();
    if(!userId)redirect('/sign-in');

    //If userid, then check if user has store, if yes, show first store, if not, then redirect to create store page
    const store = await prismadb.store.findFirst({
        where: {
            userId //Same as checking userId == userId
        }
    })
console.log("Store is: ",store)
    if(store){
        redirect(`/${store.id}`)
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default SetUpPageLayout;