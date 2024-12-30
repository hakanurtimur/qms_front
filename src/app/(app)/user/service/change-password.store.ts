import { ResponseModel } from "@/models/api/response";
import { ChangePasswordModel } from "@/models/auth";
import api from "@/services/Api";
import { create } from "zustand";

export interface IChangePasswordStore {
  changePassword: (
    data: ChangePasswordModel,
    userId: number,
  ) => Promise<unknown>;
}

export const ChangePasswordStore: IChangePasswordStore = {
  changePassword: async (data: ChangePasswordModel, userId: number) => {
    return await changePassword(data, userId);
  },
};

async function changePassword(data: ChangePasswordModel, userId: number) {
  try {
    const response = await api.post<unknown>(`/user/change-user-password`, {
      Oldpassword: data.oldPassword,
      Newpassword: data.password,
      DuplicateNewPassword: data.passwordConfirm,
      UserId: userId,
    });
    return response as unknown as ResponseModel;
  } catch (error: unknown) {
    return error as ResponseModel;
  }
}

export const useChangePasswordStore = create(() => ({
  ...ChangePasswordStore,
  changePassword: async (data: ChangePasswordModel, userId: number) => {
    return await changePassword(data, userId);
  },
}));
