import { create } from "zustand";
import axios from "axios";
import api from "@/services/Api";
import { ResponseModel } from "@/models/api/response";

export interface IForgetPasswordState {
  mail: string;
  captchaVerified: boolean;
  error: string | null;
  loading: boolean;
  setMail: (mail: string) => void;
  verifyCaptcha: (captchaResponse: string) => void;
  forgetPassword: (email: string) => Promise<void>;
}

export const ForgetPasswordState: IForgetPasswordState = {
  mail: "",
  captchaVerified: false,
  error: null,
  loading: false,
  setMail: () => {},
  verifyCaptcha: () => {},
  forgetPassword: async () => {},
};

// eslint-disable-next-line react-hooks/rules-of-hooks

export async function forgetPassword(email: string) {
  try {
    const response = await api.postWithoutData<unknown>(
      `/user/forget-password/${email}`,
    );
    console.log("response", response);
    return response as ResponseModel | unknown;
  } catch (error: unknown) {
    return error as ResponseModel | unknown;
  }
}

export const useForgetPasswordStore = create((set) => ({
  ...ForgetPasswordState,
  setMail: (mail: string) => set({ mail }),
  verifyCaptcha: async (captchaResponse: string) => {
    try {
      set({ loading: true });
      const response = await axios.post("/api/verify-captcha", {
        captchaResponse,
      });
      if (response.data.success) {
        set({ captchaVerified: true });
      } else {
        set({ error: response.data.error });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  forgetPassword: async (email: string) => {
    return await forgetPassword(email);
  },
}));
