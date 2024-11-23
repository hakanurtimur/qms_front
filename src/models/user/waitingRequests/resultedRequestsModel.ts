import { z } from "zod";

export const SResultedRequestsModel = z.object({
  Id: z.number().int(),
  AdministratorActionId: z.boolean(),
  RequestTypeId: z.number().int(),
});

export type ResultedRequestsModel = z.infer<typeof SResultedRequestsModel>;
