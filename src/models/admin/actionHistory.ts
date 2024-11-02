// src/schemas/managerHistory.ts

import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SActionHistory = z.object({
  nameSurname: z.string(),
  updateTable: z.string(),
  description: z.string(),
  createDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçersiz tarih formatı",
  }),
});

export type ActionHistoryModel = z.infer<typeof SActionHistory>;

export const SActionHistoryResponse = SResponseModel.extend({
  data: z.array(SActionHistory),
});

export type ActionHistoryResponseModel = z.infer<typeof SActionHistoryResponse>;
