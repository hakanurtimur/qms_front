import { z } from "zod";

export const SManagerLocation = z.object({
  locationId: z.number(),
  locationName: z.string(),
  state: z.boolean(),
});

export type ManagerLocationModel = z.infer<typeof SManagerLocation>;

export const SManagerLocationResponse = z.object({
  statusCode: z.number(),
  isSuccessful: z.boolean(),
  data: z.array(SManagerLocation),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  errorMessageParameters: z.any().nullable(),
});

export type ManagerLocationResponseModel = z.infer<
  typeof SManagerLocationResponse
>;
