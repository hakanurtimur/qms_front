import { z } from "zod";

export const SResponseModel = z.object({
  statusCode: z.number(),
  isSuccessful: z.boolean(),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  errorMessageParameters: z.any().nullable(),
});

export type ResponseModel = z.infer<typeof SResponseModel>;
