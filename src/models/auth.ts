import { z } from "zod";

export const SUserLogin = z.object({
  username: z.string().min(6, "Geçerli bir kullanıcı ismi giriniz"),
  password: z.string().min(6, "Şifre en az 8 karakter olmalıdır"),
  locationId: z.number().min(1),
});

export type UserLogin = z.infer<typeof SUserLogin>;

export const SManagerLogin = z.object({
  username: z.string().min(6, "Geçerli bir kullanıcı ismi giriniz"),
  password: z.string().min(6, "Şifre en az 8 karakter olmalıdır"),
  locationId: z.number().min(1),
});

export type ManagerLogin = z.infer<typeof SManagerLogin>;

export const SForgotPasswordModel = z.object({
  email: z.string().email("Geçerli bir email adresi giriniz"),
});

export type ForgotPasswordModel = z.infer<typeof SForgotPasswordModel>;

export const SChangePasswordModel = z
  .object({
    oldPassword: z
      .string()
      .min(7, "Şifre en az 7 karakter olmalıdır")
      .max(7, "Şifre en fazla 7 karakter olmalıdır"),
    password: z
      .string()
      .min(7, "Şifre en az 7 karakter olmalıdır")
      .max(7, "Şifre en fazla 7 karakter olmalıdır"),
    passwordConfirm: z
      .string()
      .min(7, "Şifre en az 7 karakter olmalıdır")
      .max(7, "Şifre en fazla 7 karakter olmalıdır"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Şifreler uyuşmuyor",
  });

export type ChangePasswordModel = z.infer<typeof SChangePasswordModel>;
