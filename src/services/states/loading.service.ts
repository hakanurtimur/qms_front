import { create } from "zustand";

export interface ILoadingState {
  loading: boolean;
  milliseconds: number;
  setLoading: (loading: boolean) => void;
  setMilliSeconds: (milliseconds: number) => void;
  setLoadingWithDelay: (loading: boolean, milliseconds: number) => void;
}

export const initialState: ILoadingState = {
  loading: false,
  milliseconds: 1.5 * 1000,
  setLoading: () => {},
  setMilliSeconds: () => {},
  setLoadingWithDelay: () => {},
};

export const loadingState = create((set) => ({
  ...initialState,
  setLoading: (loading: boolean) => set({ loading }),
  setMilliSeconds: (milliseconds: number) => set({ milliseconds }),
  setLoadingWithDelay: (loading: boolean, milliseconds: number) => {
    set({ loading });
    setTimeout(() => {
      console.log("loading", loading);
      set({ loading: false });
    }, milliseconds);
  },
}));
