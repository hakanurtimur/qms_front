import { z } from "zod";

const SDocumentMasterMainModal = z.object({
  id: z.number(),
  folderId: z.number().optional(),
  folderName: z.string(),
  documentTypeId: z.number().optional(),
  documentTypeName: z.string(),
  code: z.string(),
  fileName: z.string(),
  lastReviseNo: z.number(),
  lastReviseDate: z.string(),
  publishDate: z.string(),
});

export type DocumentMasterMainModal = z.infer<typeof SDocumentMasterMainModal>;

const SDocumentMasterMainModalResponse = z.object({
  data: z.array(SDocumentMasterMainModal),
});

export type DocumentMasterMainModalResponse = z.infer<
  typeof SDocumentMasterMainModalResponse
>;

export const SDocumentMasterMainSheetModal = z.object({
  id: z.number().optional(),
  folderId: z.number().optional(),
  folderName: z.string(),
  documentTypeName: z.string(),
  code: z.string(),
  fileName: z.string().optional(),
  publishDate: z.string(),
  lastReviseNo: z.string(),
  lastReviseDate: z.string(),
  lookOutDate: z
    .string({
      message: "Bu alan zorunludur",
    })
    .min(1, {
      message: "Bu alan zorunludur",
    }),
  archiveInfo: z.string().optional(),
  issueTypeName: z.string().optional(),
  issueTypeId: z.number().optional(),
});

export type DocumentMasterMainSheetModal = z.infer<
  typeof SDocumentMasterMainSheetModal
>;

const SDocumentMasterMainSheetModalResponse = z.object({
  data: SDocumentMasterMainSheetModal,
});

export type DocumentMasterMainSheetModalResponse = z.infer<
  typeof SDocumentMasterMainSheetModalResponse
>;

const SDocumentMasterMainSheetModelRequest = z.object({
  lookOutDate: z.string(),
  archiveInfo: z.string(),
  issueTypeId: z.number(),
});

export type DocumentMasterMainSheetModelRequest = z.infer<
  typeof SDocumentMasterMainSheetModelRequest
>;

export const SDocumentMasterHistoryModel = z.object({
  id: z.number().optional(),
  reviseNo: z.string(),
  reviseDate: z.string({
    message: "Bu alan zorunludur",
  }),
  publishDate: z.string({
    message: "Bu alan zorunludur",
  }),
  description: z.string(),
  userName: z.string(),
  superAdminName: z.string(),
  administratorName: z.string(),
});

export type DocumentMasterHistoryModel = z.infer<
  typeof SDocumentMasterHistoryModel
>;

const SDocumentMasterHistoryModelResponse = z.object({
  data: z.array(SDocumentMasterHistoryModel),
});

export type DocumentMasterHistoryResponseModel = z.infer<
  typeof SDocumentMasterHistoryModelResponse
>;

const SDocumentMasterHistoryModelRequest = z.object({
  publishDate: z.string(),
  reviseDate: z.string(),
  description: z.string(),
  reviseNo: z.string(),
});

export type DocumentMasterHistoryModelRequest = z.infer<
  typeof SDocumentMasterHistoryModelRequest
>;
