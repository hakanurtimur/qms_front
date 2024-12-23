import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SRequestDocumentListModel = z.object({
  fileId: z.number().int(),
  folderId: z.number().int(),
  categoryName: z.string(),
  folderName: z.string(),
  documentTypeId: z.number().int(),
  documentTypeName: z.string().nullable(),
  fileName: z.string(),
  printing: z.number().int(),
  reading: z.number().int(),
  url: z.string().nullable(),
  changeRequest: z.number().int(),
  qualityUserName: z.string().nullable(),
  qualityManagerUserName: z.string().nullable(),
  qualityAdministratorUserName: z.string().nullable(),
  state: z.boolean(),
});

export const SApprovedGarbageResponseModel = SResponseModel.extend({
  data: z.object({
    garbageURL: z.string(),
  }),
});

export type ApprovedGarbageResponseModel = z.infer<
  typeof SApprovedGarbageResponseModel
>;

// export const SRequestDocumentModel = z.object({
//   documentType: z.string().min(1, "Belge türü seçiniz"),
//   file: z
//     .instanceof(File)
//     .nullable()
//     .optional()
//     .refine((file) => !file || file.size > 0, {
//       message: "Boş bir dosya yükleyemezsiniz.",
//     }),
//   description: z.string().min(3, "En az 3 karakter olmalıdır"),
// });

export type RequestDocumentListModel = z.infer<
  typeof SRequestDocumentListModel
>;

export const SRequestDocumentListModelResponse = SResponseModel.extend({
  data: z.array(SRequestDocumentListModel),
});

export type RequestDocumentListModelResponse = z.infer<
  typeof SRequestDocumentListModelResponse
>;

export const SRequestDocumentGetModelResponse = SResponseModel.extend({
  data: SRequestDocumentListModel,
});

export type RequestDocumentGetModelResponse = z.infer<
  typeof SRequestDocumentGetModelResponse
>;

export const SUserCategoryFolderListModel = z.object({
  categoryId: z.number().int(),
  folderId: z.number().int(),
  folderName: z.string(),
});

export type UserCategoryFolderListModel = z.infer<
  typeof SUserCategoryFolderListModel
>;

export const SUserCategoryFolderListModelResponse = SResponseModel.extend({
  data: z.array(SUserCategoryFolderListModel),
});

export type UserCategoryFolderListModelResponse = z.infer<
  typeof SUserCategoryFolderListModelResponse
>;
