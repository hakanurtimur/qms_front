import { z } from "zod";
import { SUserRequestModelUpdate } from "@/models/user/userRequests/userRequestModel";

export const SWaitingRequestModel = z.object({
  requestNo: z.number(),
  qualityState: z.boolean(),
  managerState: z.boolean(),
  requestDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
  requester: z.string(),
  department: z.string(),
  admin: z.string(),
  documentType: z.string(),
  requestType: z.string(),
  updateDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
});

export type WaitingRequestModel = z.infer<typeof SWaitingRequestModel>;

export const SWaitingRequestModelUpdate = SUserRequestModelUpdate;

export type WaitingRequestModelUpdate = z.infer<
  typeof SWaitingRequestModelUpdate
>;
