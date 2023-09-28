"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown, PlusCircleIcon, Store, StoreIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface SwitcherProps extends PopoverTriggerProps{
    items: any[],
    onStoreSelect: Function,
    selectedItem?:any,
    storeModal: any,
    identifier: any,
    labelIdentifier: any
} 

const ComboBox = ({
    className,
    items = [],
    onStoreSelect,
    selectedItem,
    storeModal,
    identifier,
    labelIdentifier
}:SwitcherProps) => {
    
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("");
    const onItemSelect = (selectedItem:any, item:any) =>{
        console.log("Selected Item: ",item)
        console.log("Item: ",item)
    }

useEffect(() => {
    console.log('ComboBox mounted');
    return () => {
       console.log('ComboBox unmounted');
    };
 }, []);
console.log("ComboBox rendered");
  return(
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
          role="combobox" 
        >
            <StoreIcon className="mr-2 h-4 w-4"></StoreIcon> 
            {/* <Store></Store> */}
            {selectedItem[labelIdentifier]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
            <CommandList>

            
          <CommandInput placeholder="Search List..." />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup heading="Stores">
            {items.map((item) => (
              <CommandItem
                key={item[identifier]}
                className="text-sm"
                onSelect={() => {
                  setOpen(false)
                  onStoreSelect(item);
                  }}
              >
                <StoreIcon className="mr-2 h-4 w-4"></StoreIcon>
                {item[labelIdentifier]}
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedItem[identifier] === item[identifier] ? "opacity-100" : "opacity-0" 
                  )}
                />
              </CommandItem>
            ))}
        </CommandGroup>
        </CommandList>
        <CommandList>
            <CommandGroup>
            <CommandItem onSelect={()=>{
                setOpen(false)
                storeModal.onOpen();
            }}>
                    <PlusCircleIcon className="mr-2 h-5 w-5"></PlusCircleIcon>
                    Create Store
            </CommandItem>
            </CommandGroup>
            </CommandList>
         
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBox;