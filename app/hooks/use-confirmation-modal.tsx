import { create } from "zustand";

interface ConfirmationModalStore {
  isOpen: boolean;
  data: {
    message: string;
    description: string;
    warning: boolean;
    button1text: string;
    button2text: string;
  };
  onOpen: () => void;
  onClose: () => void;
  setData: (val: Partial<typeof defaultData>) => void;
}

const defaultData = {
  message: "Are you sure?",
  description: "The changes will be irreversible",
  button1text: "Confirm",
  button2text: "Cancel",
  warning: true
};

export const useConfirmationModal = create<ConfirmationModalStore>((set) => ({
  isOpen: false,
  data: defaultData,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setData: (val) => {
    set((state) => ({
      data: {
        ...state.data,
        ...val,
      },
    }));
  },
}));
