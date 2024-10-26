// src/schemas/managerHistory.ts

import { z } from "zod";

export const SActionHistory = z.object({
  nameSurname: z.string(),
  updateTable: z.string(),
  description: z.string(),
  createDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
});

export type ActionHistoryModel = z.infer<typeof SActionHistory>;

export const SActionHistoryResponse = z.object({
  statusCode: z.number(),
  isSuccessful: z.boolean(),
  data: z.array(SActionHistory),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  errorMessageParameters: z.any().nullable(),
});

export type ActionHistoryResponseModel = z.infer<typeof SActionHistoryResponse>;
