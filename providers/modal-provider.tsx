"use client"
import { StoreModal } from '@/components/modals/store-modal';
import {useEffect, useState} from 'react'

//We are creating this to prevent any hydration errors
//There are many ways in which we can open a modal, and it can so happen
// that the server sends a modal that is open, whereas in the client the modal might be closed
//This will create a hydration error
//Here we ensure that the modal is mounted as mounting can only happen in the client and not the server i.e. if mounted ias false then it means we are on the server
export const ModalProvider = () =>{

    const [isMounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }

    return (
        <>
        <StoreModal />
        </>
    )
}