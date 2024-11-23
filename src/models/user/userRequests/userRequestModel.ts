import { z } from "zod";

export const SUserRequestModel = z.object({
  requestNo: z.number(),
  state: z.boolean(),
  qualityState: z.boolean(),
  managerState: z.boolean(),
  requestDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
  requester: z.string(),
  department: z.string(),
  documentType: z.string(),
  requestType: z.string(),
  updateDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
});

export type UserRequestModel = z.infer<typeof SUserRequestModel>;

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
