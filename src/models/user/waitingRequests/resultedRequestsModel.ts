import { z } from "zod";

export const SResultedRequestsModel = z.object({
  requestNo: z.number(),
  managerState: z.boolean(),
  requestType: z.string(),
});

export type ResultedRequestsModel = z.infer<typeof SResultedRequestsModel>;
