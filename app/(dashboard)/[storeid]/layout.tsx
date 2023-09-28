import { auth } from "@clerk/nextjs";
import React from "react"
import { redirect } from 'next/navigation'
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/custom/navbar/navbar";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: {
        storeid: string;
    }
}){
    //Check for authentication
    const { userId } = auth();
    if(!userId) return redirect('/sign-in')
    console.log("Store ID Params: ",params.storeid)
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeid,
            userId
        }
    })
    console.log("Store is [storeid]: ",store)
    if(!store) redirect('/')

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}