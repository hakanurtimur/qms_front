import * as z from "zod";

export const SArchiveDocSheetModel = z.object({
  CategoryName: z.string().min(2, {
    message: "Kategori adı en az 2 karakter olmalıdır.",
  }),
  FolderName: z.string().min(2, {
    message: "Klasör adı en az 2 karakter olmalıdır.",
  }),
  FileName: z.string().min(2, {
    message: "Dosya adı en az 2 karakter olmalıdır.",
  }),
  isActive: z.boolean().default(false),
});

export type ArchiveDocSheetModel = z.infer<typeof SArchiveDocSheetModel>;

//response for archive document list ... SArchiveDocSheetModelden türetilmiş bir model olmalı ve isActive alanı olmalı
export const SArchiveDocumentResponseListModel = SArchiveDocSheetModel.omit({
  isActive: true,
});

export type ArchiveDocumentResponseListModel = z.infer<
  typeof SArchiveDocumentResponseListModel
>;
