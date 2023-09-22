"use client"

import { useStoreModal } from "@/app/hooks/use-store-modal"
import { Modal } from "../custom/modal"

export const StoreModal = () => {
    const storeModal = useStoreModal();
    return(
        <Modal isOpen={storeModal.isOpen} title="Create A New Store" description="Enter the details of your new store" onClose={storeModal.onClose}></Modal>
    )
}