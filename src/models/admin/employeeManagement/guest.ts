import { z } from "zod";

export const SGuestCreated = z.object({
  name: z.string().min(2, "En az 2 karakter olmalıdır"),
  surname: z.string().min(2, "En az 2 karakter olmalıdır"),
  mail: z.string().email().email("Geçerli bir e-posta adresi giriniz"),
  phoneNumber: z.string().min(10, "En az 10 karakter olmalıdır"),
});

export type GuestCreated = z.infer<typeof SGuestCreated>;
