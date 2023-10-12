import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{
        params: {storeid:string}
    }
){
    try{
        const { userId } = auth();
        if(!userId) return new NextResponse("Unauthorized",{status: 401})
        const body = await req.json();
        const { name } = body
        if(!name)return new NextResponse("Name is required",{status:400})
        if(!params.storeid)return new NextResponse("Storeid is required",{status:400})
        const store = await prismadb.store.updateMany({
            where:{
                id: params.storeid,
                userId
            },
            data:{
                name
            }
    });
    return NextResponse.json(store)
    }
    catch(err){
        console.log("[STORE PATCH] ",err)
        return new NextResponse("Internal Error",{status:500})
    }
}

export async function DELETE(
    req:Request,
    {params}:{
        params: {storeid:string}
    }
){
    try{
        const { userId } = auth();
        if(!userId) return new NextResponse("Unauthorized",{status: 401})
        if(!params.storeid)return new NextResponse("Storeid is required",{status:400})
        const store = await prismadb.store.deleteMany({
            where:{
                id: params.storeid,
                userId
            }
    });
    return NextResponse.json(store)
    }
    catch(err){
        console.log("[STORE DELETE] ",err)
        return new NextResponse("Internal Error",{status:500})
    }
}