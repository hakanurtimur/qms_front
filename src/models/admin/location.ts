import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SManagerLocation = z.object({
  locationId: z.number(),
  locationName: z.string(),
  state: z.boolean(),
});

export type ManagerLocationModel = z.infer<typeof SManagerLocation>;

export const SManagerLocationResponse = SResponseModel.extend({
  data: z.array(SManagerLocation),
});

export type ManagerLocationResponseModel = z.infer<
  typeof SManagerLocationResponse
>;
