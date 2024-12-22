import { z } from "zod";

export const SDocumentModel = z.object({
  categoryName: z.string(),
  fileId: z.number(),
  fileName: z.string(),
  folderName: z.string(),
  printing: z.number(),
  reading: z.number(),
  url: z.string().nullable(),
});

export type DocumentModel = z.infer<typeof SDocumentModel>;

const DocumentApiResponseSchema = z.object({
  data: z.array(SDocumentModel),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  errorMessageParameters: z.any().nullable(),
  isSuccessful: z.boolean(),
  statusCode: z.number(),
});

export type DocumentApiResponse = z.infer<typeof DocumentApiResponseSchema>;

const SDocumentFilterModel = z.object({
  categoryName: z.string().optional(),
  folderName: z.string().optional(),
  fileName: z.string().optional(),
});

export type DocumentFilterModel = z.infer<typeof SDocumentFilterModel>;

const DocumentApiResponseUrlSchema = z.object({
  data: SDocumentModel,
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  errorMessageParameters: z.any().nullable(),
  isSuccessful: z.boolean(),
  statusCode: z.number(),
});

export type DocumentApiResponseUrl = z.infer<
  typeof DocumentApiResponseUrlSchema
>;

export const SDocumentCategoryListModel = z.object({
  categoryId: z.number(),
  categoryName: z.string(),
});

export type DocumentCategoryListModel = z.infer<
  typeof SDocumentCategoryListModel
>;

export const SDocumentCategoryListResponseModel = z.object({
  data: z.array(SDocumentCategoryListModel),
});

export type DocumentCategoryListResponseModel = z.infer<
  typeof SDocumentCategoryListResponseModel
>;

export const DocumentFolderListModel = z.object({
  categoryId: z.number(),
  folderName: z.string(),
});

export type DocumentFolderListModel = z.infer<typeof DocumentFolderListModel>;

export const DocumentFolderListResponseModel = z.object({
  data: z.array(DocumentFolderListModel),
});

export type DocumentFolderListResponseModel = z.infer<
  typeof DocumentFolderListResponseModel
>;
