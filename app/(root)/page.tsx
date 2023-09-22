"use client"
import { Modal } from "@/components/custom/modal";
import { UserButton } from "@clerk/nextjs"
import { useStoreModal } from "../hooks/use-store-modal";
import { useEffect } from "react";

export default function SetupPage() {
    const storeModal = useStoreModal();

    useEffect(()=>{
        if(!storeModal.isOpen){
            storeModal.onOpen()
        }
    },[storeModal.isOpen,storeModal.onOpen])
    return(
        <div className="p-4">
            {/* <UserButton afterSignOutUrl="/" />
            <div>Home Page</div> */}
        Root Page
        </div>
    );
}