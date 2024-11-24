import { z } from "zod";

export const SRequestDocumentModel = z.object({
  documentType: z.string().min(1, "Belge türü seçiniz"),
  file: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Boş bir dosya yükleyemezsiniz.",
    }),
  description: z.string().min(3, "En az 3 karakter olmalıdır"),
});

export type RequestDocumentModel = z.infer<typeof SRequestDocumentModel>;
