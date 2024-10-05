import { z } from "zod";

export const SLoginForm = z.object({
  username: z.string().min(6, "Geçerli bir kullanıcı ismi giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
  branch: z.string().min(1),
});

export type LoginForm = z.infer<typeof SLoginForm>;

export const SAdminLoginForm = z.object({
  username: z.string().min(6, "Geçerli bir kullanıcı ismi giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
});

export type AdminLoginForm = z.infer<typeof SAdminLoginForm>;
