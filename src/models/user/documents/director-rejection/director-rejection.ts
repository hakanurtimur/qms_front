import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SDirectorRejectionModel = z.object({
  id: z.number(), // Id INT (Talep No)
  superAdminActionName: z.string(), // SuperAdminActionName STRING (Kalite Durum)
  administratorActionName: z.string(), // AdministratorActionName STRING (Yönetici Durum)
  openDate: z.date(), // OpenDate DATETIME (Talep Tarihi)
  departmentName: z.string(), // DepartmentName STRING (Bölüm)
  superAdminName: z.string(), // SuperAdminName STRING (KYS Sorumlusu)
  documentTypeName: z.string(), // DocumentTypeName STRING (Döküman Tipi)
  requestTypeName: z.string(), // RequestTypeName STRING (Talep Tipi)
  updateDate: z.date(), // UpdateDate DATETIME (Güncelleme Tarihi)
});

export type DirectorRejectionModel = z.infer<typeof SDirectorRejectionModel>;

export const SDirectorRejectionResponseModel = SResponseModel.extend({
  data: z.array(SDirectorRejectionModel),
});

export type DirectorRejectionResponseModel = z.infer<
  typeof SDirectorRejectionResponseModel
>;

export const SDirectorRejectionDetailsModel = z.object({
  id: z.number(), // Id INT
  actionName: z.string(), // ActionName STRING
  superAdminActionName: z.string(), // SuperAdminActionName STRING
  administratorActionId: z.number(), // AdministratorActionId INT
  openDate: z.string(), // OpenDate DATETIME
  userName: z.string(), // UserName STRING
  departmentName: z.string(), // DepartmentName STRING
  mail: z.string(), // Mail STRING
  phoneNumber: z.string(), // PhoneNumber STRING
  documentTypeName: z.string(), // DocumentTypeName STRING
  requestTypeName: z.string(), // RequestTypeName STRING
  descriptionUser: z.string(), // DescriptionUser STRING
  adminName: z.string(), // AdminName STRING
  descriptionManager: z.string(), // DescriptionManager STRING
  superAdminName: z.string(), // SuperAdminName STRING
  superAdminAboutName: z.string(), // SuperAdminAboutName STRING
  descriptionSuperAdmin: z.string(), // DescriptionSuperAdmin STRING
  administratorName: z.string(), // AdministratorName STRING
  updateDate: z.string(), // UpdateDate DATETIME
  fileId: z.number(), // FileId INT
  fileName: z.string(), // FileName STRING
  garbageId: z.number(), // GarbageId INT
});

export type DirectorRejectionDetailsModel = z.infer<
  typeof SDirectorRejectionDetailsModel
>;

export const SDirectorRejectionResponseDetailsModel = SResponseModel.extend({
  data: SDirectorRejectionDetailsModel,
});

export type DirectorRejectionResponseDetailsModel = z.infer<
  typeof SDirectorRejectionResponseDetailsModel
>;
