import { z } from "zod";
import { SResponseModel } from "@/models/api/response";
import { SWaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";

// Id INT (Talep No)
//
// ActionName STRING (Durum)
//
// SuperAdminActionName STRING (Kalite Durum)
//
// AdministratorActionName STRING (Yönetici Durum)
//
// OpenDate DATETIME (Talep Tarihi)
//
// UserName STRING  (Talep Eden)
//
// DepartmentName STRING (Bölüm)
//
// DocumentTypeName STRING (Döküman Tipi)
//
// RequestTypeName STRING (Talep Tipi)
//
// UpdateDate DATETIME (Güncelleme Tarihi)

export const SUserRequestModel = SWaitingRequestModel.extend({});

export type UserRequestModel = z.infer<typeof SUserRequestModel>;

export const SUserRequestModelResponse = SResponseModel.extend({
  data: z.array(SUserRequestModel),
});

export type UserRequestModelResponse = z.infer<
  typeof SUserRequestModelResponse
>;
export const SUserRequestModelDetailsResponse = SResponseModel.extend({
  data: SUserRequestModel,
});

export type UserRequestModelDetailsResponse = z.infer<
  typeof SUserRequestModelDetailsResponse
>;

// reusable as WaitingRequestModelUpdate

export const SUserRequestModelUpdate = z.object({
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

export type UserRequestModelUpdate = z.infer<typeof SUserRequestModelUpdate>;

export const SUpdateDocumentDemandModel = z.object({
  id: z.number().int().min(0), // Id
  userId: z.number().int().min(0), // UserId
  actionId: z.number().int().min(0), // ActionId
  descriptionUser: z.string().optional(), // DescriptionUser (can be optional if not always provided)
  descriptionAdmin: z.string().optional(), // DescriptionAdmin (can be optional if not always provided)
  garbageFileName: z.string().optional().nullable(), // GarbageFileName (can be optional)
  roleId: z.number().int().min(0), // RoleId
  formFile: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Boş bir dosya yükleyemezsiniz.",
    }),
});

export type UpdateDocumentDemandModel = z.infer<
  typeof SUpdateDocumentDemandModel
>;
