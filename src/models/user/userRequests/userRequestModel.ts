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

export const SUserRequestModelUpdate = z.object({
  RequestNumber: z.number().int(),
  ActionId: z.number().int(),
  ManagerActionName: z.string(),
  AdministratorActionName: z.string(),
  OpenDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
  UserName: z.string(),
  DepartmentName: z.string(),
  DocumentTypeId: z.number().int(),
  RequestTypeName: z.string(),
  DescriptionUser: z.string(),
  DescriptionManager: z.string(),
  AdminName: z.string(),
  SuperAdminName: z.string(),
  AdminAboutName: z.string(),
  DescriptionAdmin: z.string(),
  AdministratorName: z.string(),
  UpdateDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
  FileId: z.number().int(),
  FieName: z.string(),
  GarbageId: z.number().int(),
  AuthRequestId: z.number().int(),
});

export type UserRequestModelUpdate = z.infer<typeof SUserRequestModelUpdate>;
