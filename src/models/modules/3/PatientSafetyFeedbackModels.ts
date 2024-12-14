import { z } from "zod";

const SFeedbackEventTpyeModel = z.object({
  typeId: z.string(),
  typeName: z.string(),
});

export type FeedbackEventTypeModel = z.infer<typeof SFeedbackEventTpyeModel>;

export const SFeedbackEventTpyeListModel = z.array(SFeedbackEventTpyeModel);

export type FeedbackEventTpyeListModel = z.infer<
  typeof SFeedbackEventTpyeListModel
>;

export const SFeedbackEventTypeListResponseModel = z.object({
  data: SFeedbackEventTpyeListModel,
});

export type FeedbackEventTypeListResponseModel = z.infer<
  typeof SFeedbackEventTypeListResponseModel
>;

//---------------Event Scene Model----------------
const SEventSceneModel = z.object({
  eventSceneId: z.string(),
  eventSceneName: z.string(),
});

export type EventSceneModel = z.infer<typeof SEventSceneModel>;

export const SEventSceneListModel = z.array(SEventSceneModel);

export type EventSceneListModel = z.infer<typeof SEventSceneListModel>;

export const SEventSceneListResponseModel = z.object({
  data: SEventSceneListModel,
});

export type EventSceneListResponseModel = z.infer<
  typeof SEventSceneListResponseModel
>;

//---------------Patient Safety Feedback Insert Model----------------

const SPatientSafetyFeedbackInsertRequestModel = z.object({
  typeId: z.number(),
  eventSceneId: z.number(),
  eventDate: z.string(),
  description: z.string(),
  fileName: z.string(),
  formFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Boş bir dosya yükleyemezsiniz.",
    }),
});

export type PatientSafetyFeedbackInsertRequestModel = z.infer<
  typeof SPatientSafetyFeedbackInsertRequestModel
>;

//-----------------Patient Model----------------

const SPatientModel = z.object({
  nameSurname: z.string(),
  birthDate: z.string(),
  identityNumber: z.string(),
  patientId: z.string(),
  protocolId: z.string(),
});

export type PatientModel = z.infer<typeof SPatientModel>;

export const SPatientModelResponse = z.object({
  data: SPatientModel,
});

export type PatientModelResponse = z.infer<typeof SPatientModelResponse>;

// ------- Patient Safety Feedback Patient Reqeust ----------------

const SPatientSafetyFeedbackPatientRequestModel = z.object({
  typeId: z.number(),
  victimState: z.number(),
  victimUserId: z.number(),
  eventSceneId: z.number(),
  eventDate: z.string(),
  description: z.string(),
  fileName: z.string(),
  formFile: z.instanceof(File).refine((file) => !file || file.size > 0, {
    message: "Boş bir dosya yükleyemezsiniz.",
  }),
  protocolId: z.string(),
});

export type PatientSafetyFeedbackPatientRequestModel = z.infer<
  typeof SPatientSafetyFeedbackPatientRequestModel
>;
