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
  formFile: z.instanceof(File).refine((file) => !file || file.size > 0, {
    message: "Boş bir dosya yükleyemezsiniz.",
  }),
});

export type PatientSafetyFeedbackInsertRequestModel = z.infer<
  typeof SPatientSafetyFeedbackInsertRequestModel
>;
