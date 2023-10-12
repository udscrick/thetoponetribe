//TODO
//Take store id as params input
//Check if user is authenticated
//Find store using storeid from prisma db
//If no store found redirect to default url '/'
//Create a settings form and pass store data to it. It will be a client component
//Allow deleting store in the settings form => Will open alert modal asking if user is sure
//Initialise form with default values as the ones received from the parent component
//Form should have name and button to update name of store/ save changes
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { Store } from "@prisma/client"
import { redirect } from "next/navigation"
import { FC, useEffect } from "react"
import SettingsForm from "./components/settings-form/page"
import ApiAlert from "@/components/custom/settings/api-alert/page"
import { useOrigin } from "@/app/hooks/use-origin"
import ApiList from "./components/(api-list)/page"

//Create Patch API to update the store
interface SettingPageProps{
    params: {
        storeid: string
    }
}

export const SettingsPage = async ({
    params
}:SettingPageProps) =>{
    console.log("Settigs page params: ",params)
    const { userId } = auth();
    if(!userId) redirect('/sign-in')

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeid,
            userId
        }
    })
    if(!store) redirect('/')



    return(
        <div className="p-4">
            <div className="mb-20">
            <h1 className="text-4xl">Settings</h1>
            <p className="font-light text-sm text-opacity-10">Make changest to your store</p>
            </div>
            <SettingsForm initialData = {store}/>
            <div className="mt-20">
            <h2 className="text-2xl">
                API Keys
            </h2>

           <ApiList storeid={params.storeid}></ApiList>
            
            </div>
            
        </div>
    )
}

export default SettingsPage