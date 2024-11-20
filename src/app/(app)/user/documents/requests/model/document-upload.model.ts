import { z } from "zod";

export const IDocumentUploadSchema = z.object({
  Id: z.number().int(),
  UserId: z.number().int(),
  DocumentTypeId: z.number().int(), // Combobox(Broşür, Bilgi Föyleri)
  FolderId: z.number().int(), // Combobox(Rıza Belgeleri, Formlar)
  Code: z.string(),
  Name: z.string(), // Dosyanın adından
  PublishDate: z.string(), // Yayınlanma Tarihi
  ArchiveInfo: z.string(), // Metin girecek
  IssueTypeId: z.number().int(), // Combobox(Elektronik, Baskı, Dijital)
  Hidden: z.number().int(), // Combobox(Public, Private)
  ReviseDate: z.string(), // Revize tarihi
  Description: z.string(), // Açıklama
});

export type DocumentUploadModel = z.infer<typeof IDocumentUploadSchema>;
