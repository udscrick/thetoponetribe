"user client";

import { useConfirmationModal } from "@/app/hooks/use-confirmation-modal";
import { Modal } from "../custom/modal";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export const ConfirmationModal = ({onConfirm, onCancel, loading}:{onConfirm:()=>any,onCancel: ()=>any, loading: boolean}) => {
  const confirmationModal = useConfirmationModal();
//   const [showLoading, setShowLoading] = useState(false);
// // const onConfirm = ({onConfirm}:{onConfirm:()=>any}) => {}
// useEffect(()=>{
//     setShowLoading(loading);
// },[loading])
  return (
    <Modal
      isOpen={confirmationModal.isOpen}
      title={confirmationModal.data.message}
      description={confirmationModal.data.description}
      onClose={confirmationModal.onClose}
    >
        <div>
            <div className="space-y-4 py-2 pb-4">
      <div className="pt-6 flex justify-end space-x-2">
        <Button
          disabled={loading}
          variant={confirmationModal.data.warning?"destructive":"default"}
          onClick={onConfirm}
          type="button"
        >
          {confirmationModal.data.button1text}
        </Button>
        <Button disabled={loading} type="button"  onClick={onCancel}>
          {confirmationModal.data.button2text}
        </Button>
      </div>
      </div>
      </div>
    </Modal>
  );
};
