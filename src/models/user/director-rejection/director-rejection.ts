import { z } from "zod";

export const SDirectorRejectionModel = z.object({
  requestNo: z.number(),
  adminName: z.string(),
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

export type DirectorRejectionModel = z.infer<typeof SDirectorRejectionModel>;
