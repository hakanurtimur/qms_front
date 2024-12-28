import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SWaitingRequestModel = z.object({
  id: z.number(),
  documentTypeId: z.number(),
  documentTypeName: z.string(),
  approveGarbageId: z.number().optional(),
  userId: z.number(),
  roleId: z.number(),
  userName: z.string(),
  mail: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  departmentId: z.number(),
  departmentName: z.string(),
  adminId: z.number(),
  adminName: z.string(),
  superAdminId: z.number(),
  superAdminName: z.string().nullable(),
  administratorId: z.number(),
  administratorName: z.string().nullable(),
  actionId: z.number(),
  actionName: z.string().nullable(),
  superAdminActionId: z.number(),
  superAdminActionName: z.string(),
  administratorActionId: z.number(),
  administratorActionName: z.string(),
  superAdminAboutId: z.number(),
  superAdminAboutName: z.string().nullable(),
  requestTypeId: z.number(),
  requestTypeName: z.string(),
  archiveInfo: z.string().nullable(),
  description: z.string().nullable(),
  descriptionUser: z.string().nullable(),
  descriptionAdmin: z.string().nullable(),
  descriptionSuperAdmin: z.string().nullable(),
  fileUploadState: z.boolean(),
  updateDate: z.string(),
  openDate: z.string(),
  garbageId: z.number(),
  garbageFileName: z.string().nullable(),
  garbageURL: z.string().nullable(),
  authRequestId: z.number(),
  pathName: z.string().nullable(),
  guid: z.string().nullable(),
  guidUrl: z.string().nullable(),
  code: z.string().nullable(),
  hiddenId: z.number(),
  hiddenName: z.string().nullable(),
  folderId: z.number(),
  fileId: z.number(),
  fileName: z.string().nullable(),
  newFileName: z.string().nullable(),
  issueTypeId: z.number(),
  issueTypeName: z.string().nullable(),
  publishDate: z.string().datetime(),
  reviseDate: z.string().datetime(),
  reviseNo: z.string().nullable(),
  format: z.string().nullable(),
  getValue: z.number(),
});

export type WaitingRequestModel = z.infer<typeof SWaitingRequestModel>;

export const SWaitingRequestResponseModel = SResponseModel.extend({
  data: z.array(SWaitingRequestModel),
});

export type WaitingRequestResponseModel = z.infer<
  typeof SWaitingRequestResponseModel
>;
export const SWaitingRequestResponseDetailsModel = SResponseModel.extend({
  data: SWaitingRequestModel,
});

export type WaitingRequestResponseDetailsModel = z.infer<
  typeof SWaitingRequestResponseDetailsModel
>;

export const SWaitingRequestModelUpdate = z.object({
  Id: z.number().int(),
  ActionId: z.number().int(),
  ActionName: z.string(),
  SuperAdminAboutId: z.number().int(),
  SuperAdminAboutName: z.string(),
  AdministratorActionId: z.number().int(),
  AdministratorActionName: z.string(),
  AdministratorName: z.string(),
  AdminName: z.string(),
  AuthRequestId: z.number().int(),
  DepartmentName: z.string(),
  DescriptionSuperAdmin: z.string(),
  DescriptionAdmin: z.string(),
  DescriptionUser: z.string(),
  DocumentTypeId: z.number().int(),
  DocumentTypeName: z.string(),
  FileId: z.number().int(),
  FieName: z.string(),
  FileUploadState: z.number().int(),
  GarbageId: z.number().int(),
  Mail: z.string(),
  SuperAdminActionId: z.number().int(),
  SuperAdminActionName: z.string(),
  OpenDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
  PhoneNumber: z.string(),
  RequestTypeId: z.number().int(),
  RequestTypeName: z.string(),
  SuperAdminName: z.string(),
  UpdateDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
  UserName: z.string(),
});

export type WaitingRequestModelUpdate = z.infer<
  typeof SWaitingRequestModelUpdate
>;

export const SUpdateWaitingRequestModel = z
  .object({
    id: z.number().int().nonnegative(), // id: Integer, non-negative
    userId: z.number().int().nonnegative(), // userId: Integer, non-negative
    superAdminActionId: z.number().int().nonnegative(), // actionId: Integer, non-negative
    documentTypeId: z.number().int().nonnegative(), // documentTypeId: Integer, non-negative
    superAdminAboutId: z.number().int(),
    descriptionSuperAdmin: z.string({}).optional(), // descriptionSuperAdmin: String, min: 1
    formFile: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file.size > 0, {
        message: "Boş bir dosya yükleyemezsiniz.",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.superAdminActionId === 4) {
      if (!data.formFile) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Üst yönetici onayı için dosya gereklidir",
          path: ["formFile"],
        });
      }
    }

    if (
      data.superAdminActionId !== 5 &&
      data.superAdminActionId !== 2 &&
      data.superAdminActionId !== 1 &&
      (!data.superAdminAboutId || data.superAdminAboutId <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Talep Nedeni seçmelisiniz",
        path: ["superAdminAboutId"],
      });
    }

    if (
      (data.superAdminActionId === 2 || data.superAdminActionId === 5) &&
      (!data.descriptionSuperAdmin || data.descriptionSuperAdmin!.length <= 5)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Açıklama en az 5 karakter olmalıdır",
        path: ["descriptionSuperAdmin"],
      });
    }
  });

export type UpdateWaitingRequestModel = z.infer<
  typeof SUpdateWaitingRequestModel
>;

export const SSuperAdminActionOptionListModel = z.object({
  superAdminActionId: z.number(),
  superAdminActionName: z.string(),
});

export type SuperAdminActionOptionListModel = z.infer<
  typeof SSuperAdminActionOptionListModel
>;

export const SSuperAdminActionOptionListResponseModel = SResponseModel.extend({
  data: z.array(SSuperAdminActionOptionListModel),
});

export type SuperAdminActionOptionListResponseModel = z.infer<
  typeof SSuperAdminActionOptionListResponseModel
>;
export const SSuperAdminAboutOptionListModel = z.object({
  superAdminAboutId: z.number(),
  superAdminAboutName: z.string(),
});

export type SuperAdminAboutOptionListModel = z.infer<
  typeof SSuperAdminAboutOptionListModel
>;

export const SSuperAdminAboutOptionListResponseModel = SResponseModel.extend({
  data: z.array(SSuperAdminAboutOptionListModel),
});

export type SuperAdminAboutOptionListResponseModel = z.infer<
  typeof SSuperAdminAboutOptionListResponseModel
>;
