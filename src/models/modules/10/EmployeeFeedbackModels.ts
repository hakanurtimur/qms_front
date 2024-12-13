import { z } from "zod";

const SEmployeeFeedbackInsertRequestModel = z.object({
  personelUserId: z.number(),
  incidentUserId: z.number(),
  eventSceneId: z.number(),
  eventDate: z.string(),
  description: z.string(),
  fileName: z.string().optional(),
  formFile: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Boş bir dosya yükleyemezsiniz.",
    }),
});

export type EmployeeFeedbackInsertRequestModel = z.infer<
  typeof SEmployeeFeedbackInsertRequestModel
>;
