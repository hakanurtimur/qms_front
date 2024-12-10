import { z } from "zod";

const SModuleUserListModel = z.object({
  userId: z.string(),
  nameSurname: z.string(),
});

export type ModulesUserList = z.infer<typeof SModuleUserListModel>;

const SModuleUserListResponseModel = z.object({
  data: z.array(SModuleUserListModel),
});

export type ModulesUserListResponse = z.infer<
  typeof SModuleUserListResponseModel
>;

const SPatientFeedbackByIdRequestModel = z.object({
  userId: z.string().optional(),
  protocolId: z.string().optional(),
  identityNumber: z.string().optional(),
});

export type PatientFeedbackByIdRequestModel = z.infer<
  typeof SPatientFeedbackByIdRequestModel
>;

const SPatientFeedbackByIdModel = z.object({
  nameSurname: z.string(),
  birthDate: z.string(),
  patientId: z.string(),
  phoneNumber: z.string(),
  protocolId: z.string(),
});

export type PatientFeedbackByIdModel = z.infer<
  typeof SPatientFeedbackByIdModel
>;

const SPatientFeedbackByIdResponseModel = z.object({
  data: SPatientFeedbackByIdModel,
});

export type PatientFeedbackByIdResponseModel = z.infer<
  typeof SPatientFeedbackByIdResponseModel
>;

const SFeedbackTypeModel = z.object({
  feedbackTypeId: z.number(),
  feedbackTypeName: z.string(),
});

export type FeedbackTypeModel = z.infer<typeof SFeedbackTypeModel>;

const SFeedbackTypeResponseModel = z.object({
  data: z.array(SFeedbackTypeModel),
});

export type FeedbackTypeResponseModel = z.infer<
  typeof SFeedbackTypeResponseModel
>;

const SPatientFeedbackInsertRequestModel = z.object({
  userId: z.string(),
  protocolId: z.string(),
  phoneNumber: z.string(),
  feedbackTypeId: z.number(),
  description: z.string(),
});

export type PatientFeedbackInsertRequestModel = z.infer<
  typeof SPatientFeedbackInsertRequestModel
>;
