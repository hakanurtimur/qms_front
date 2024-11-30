import { z } from "zod";
import { SUserRequestModelUpdate } from "@/models/user/documents/userRequests/userRequestModel";
import { SResponseModel } from "@/models/api/response";

export const SWaitingRequestModel = z.object({
  id: z.number(),
  documentTypeId: z.number(),
  documentTypeName: z.string(),
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
  updateDate: z.string().datetime(),
  openDate: z.string().datetime(),
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

export const SWaitingRequestModelUpdate = SUserRequestModelUpdate;

export type WaitingRequestModelUpdate = z.infer<
  typeof SWaitingRequestModelUpdate
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
