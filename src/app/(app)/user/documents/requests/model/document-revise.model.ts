import { z } from "zod";

export const IDocumentReviseSchema = z.object({
  Id: z.number().int(),
  UserId: z.number().int(),
  DocumentTypeId: z.number().int(), // Combobox(Broşür, Bilgi Föyleri)
  FileId: z.number().int(), // Dışardan gelecek FileId
  ReviseNo: z.string(),
  Code: z.string(),
  Name: z.string(), // Dosyanın adından
  ReviseDate: z.string(), // Revize tarihi
  ArchiveInfo: z.string(), // Metin girecek
  IssueTypeId: z.number().int(), // Combobox(Elektronik, Baskı, Dijital)
  Description: z.string(), // Açıklama
});

export type DocumentReviseModel = z.infer<typeof IDocumentReviseSchema>;
