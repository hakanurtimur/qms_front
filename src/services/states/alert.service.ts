import { create } from "zustand";
import { initialState } from "./loading.service";

export interface IAlertState {
  message: string;
  type: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  showAlert: (
    message: string,
    type: "success" | "error" | "info" | "warning",
  ) => void;
  showAlertForDuration: (
    message: string,
    type: "success" | "error" | "info" | "warning",
    duration: number,
  ) => void;
  hideAlert: () => void;
}

export const AlertState: IAlertState = {
  message: "",
  type: "success",
  isVisible: false,
  showAlert: () => {},
  showAlertForDuration: () => {},
  hideAlert: () => {},
};

export const useAlertStore = create((set) => ({
  ...initialState,
  showAlert: (
    message: string,
    type: "success" | "error" | "info" | "warning",
  ) => set({ message, type, isVisible: true }),
  showAlertForDuration: (
    message: string,
    type: "success" | "error" | "info" | "warning",
    duration: number = 3000,
  ) => {
    set({ message, type, isVisible: true });
    setTimeout(() => set({ isVisible: false }), duration);
  },
  hideAlert: () => set({ isVisible: false }),
}));
