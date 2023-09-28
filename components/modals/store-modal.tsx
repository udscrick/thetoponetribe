"use client"

import { useStoreModal } from "@/app/hooks/use-store-modal"
import { Modal } from "../custom/modal"
import * as z from 'zod';
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from 'axios';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

const newStoreFormSchema = z.object({
    name: z.string().min(1)
})
export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof newStoreFormSchema>>({
        resolver: zodResolver(newStoreFormSchema),
        defaultValues: {
            name: ""
        }
    })

    const onFormSubmit = async(values: z.infer<typeof newStoreFormSchema>) =>{
        console.log("Form Values: ",values)
        try{
            setLoading(true);
            const formSubmitResponse = await axios.post('/api/stores',values)
            console.log("Form Submit Response: ",formSubmitResponse)
            toast.success("Store created successfully")
            window.location.assign(`/${formSubmitResponse.data.id}`)
            // redirect(`/${formSubmitResponse.data.id}`)
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            toast.error("There was an error in creating the store")
        }
    }
    return(
        <Modal isOpen={storeModal.isOpen} title="Create A New Store" description="Enter the details of your new store" onClose={storeModal.onClose}>
            <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)}>
                        <FormField 
                        name="name"
                        control={form.control}
                        disabled={loading}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ecommerce Store" {...field}></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}

                        />
                        <div className="pt-6 flex justify-end space-x-2">
                            <Button disabled={loading} variant={"outline"} onClick={()=>storeModal.onClose} type="button">Cancel</Button>
                            <Button disabled={loading} type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>

            </div>
            </div>
        </Modal>
    )
}