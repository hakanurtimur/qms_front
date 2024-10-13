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
