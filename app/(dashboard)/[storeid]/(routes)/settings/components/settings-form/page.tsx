"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useConfirmationModal } from "@/app/hooks/use-confirmation-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";

interface SettingsFormModel {
  initialData: Store;
}
const updateStoreSchema = z.object({
  name: z.string().min(1),
});
type SettingsFormValues = z.infer<typeof updateStoreSchema>;

const SettingsForm = ({ initialData }:SettingsFormModel) => {
    const params = useParams();
    const router = useRouter();
    const confirmationModal = useConfirmationModal();
  const [loading, setLoading] = useState(false);
  console.log("Initial Data: ", initialData);
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: initialData,
  });
  const onFormSubmit = async(data:SettingsFormValues) => {
    console.log("onFormSubmit", data);
    try{
        setLoading(true);
        await axios.patch(`/api/stores/${params.storeid}`,data)
        router.refresh();
        toast.success("Store updated successfully")
    }
    catch(error){
        toast.error("Something went wrong!");
    }
    finally{
        setLoading(false)
    }
  };
  const onDeleteStore = () => {
    confirmationModal.onOpen();
    confirmationModal.setData({
      message: 'Are you sure you want to delete this store?',
      button1text:'Confirm',
      button2text:'Cancel',
      warning: true
    })
    console.log("onDeleteStore: ",confirmationModal)
    // try{
    //   setLoading(true);
    //   await axios.delete(`/api/stores/${params.storeid}`)
    //   router.refresh();
    //   toast.success("Store deleted successfully")
    //   setLoading(false);
    // }
    // catch(error){
    //   toast.error("Something went wrong!");
    // }
  }
  const onConfirmDelete = async() => {
     try{
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeid}`)
      router.refresh();
      router.push('/')
      toast.success("Store deleted successfully")
    
    }
    catch(error){
      toast.error("Something went wrong!");
    }
    finally{
      setLoading(false);
    }
  }
  const onCancelDelete = () =>{
    confirmationModal.onClose();
  }
  return (
    <>
    <ConfirmationModal onConfirm={onConfirmDelete} onCancel = {onCancelDelete} loading={loading}></ConfirmationModal>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-8 w-full"
      >
        <div className="grid grid-cols-3 gap-8">
          <FormField
            name="name"
            control={form.control}
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ecommerce Store" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-2">
          <Button disabled={loading} type="submit">
            Save Changes
          </Button>
          <Button disabled={loading} type="button" variant={"destructive"} onClick={onDeleteStore}>
            Delete Store
          </Button>
        </div>
      </form>
    </Form>
    </>
  );
};

export default SettingsForm;
