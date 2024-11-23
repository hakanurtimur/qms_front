import * as z from "zod";

export const SArchiveDocSheetModel = z.object({
  categoryName: z.string().min(2, {
    message: "Kategori adı en az 2 karakter olmalıdır.",
  }),
  folderName: z.string().min(2, {
    message: "Klasör adı en az 2 karakter olmalıdır.",
  }),
  fileName: z.string().min(2, {
    message: "Dosya adı en az 2 karakter olmalıdır.",
  }),
  isActive: z.boolean().default(false),
});

export type ArchiveDocSheetModel = z.infer<typeof SArchiveDocSheetModel>;
