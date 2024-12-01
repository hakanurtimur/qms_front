import { z } from "zod";

export const SResultedRequestsFormModel = z.object({
  Id: z.number().int(),
  UserId: z.number().int(),
  DocumentTypeId: z.number().int().optional(),
  FolderId: z.number().int().optional(),
  Code: z.string(),
  NewFileName: z.string(),
  PublishDate: z.string(),
  ArchiveInfo: z.string(),
  IssueTypeId: z.number().int(),
  HiddenId: z.number().int(),
  Format: z.string(),
  ReviseDate: z.string(),
  Description: z.string(),
  FileId: z.number().int().optional(),
  ReviseNo: z.string().optional(),
});

export type ResultedRequestsFormModel = z.infer<
  typeof SResultedRequestsFormModel
>;
