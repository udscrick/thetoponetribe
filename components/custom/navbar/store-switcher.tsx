"use client"

import { useStoreModal } from "@/app/hooks/use-store-modal"
import ComboBox from "@/components/custom/combo-box"
import { PopoverTrigger } from "@/components/ui/popover"
import { Store } from "@prisma/client"
import { redirect, useParams, useRouter } from "next/navigation"
import React from "react"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps{
    items: Store[],
}

const StoreSwitcher = ({
    className,
    items = []
}: StoreSwitcherProps) => {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map(item => ({id: item.id, label: item.name}));
    const currentStore = formattedItems.find((item)=>item.id === params.storeid)
    const onSelect = (store: {id: string; label: string} ):void => {
        console.log("Selected Store: ",store)
        router.push(`/${store.id}`)
        console.log("Route Vhang")
        // redirect(`/${selectedItem.id}`);
    }
    console.log("Parent rendered: ",items)
    return(
        
        <ComboBox identifier={"id"} labelIdentifier={"label"} items={formattedItems} onStoreSelect={onSelect} selectedItem={currentStore} storeModal={storeModal}/>
    )
}

export default StoreSwitcher;