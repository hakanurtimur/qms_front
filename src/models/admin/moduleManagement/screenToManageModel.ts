import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SScreenToManageModel = z.object({
  id: z.number().optional(),
  pageName: z.string(),
  moduleName: z.string(),
  subModuleName: z.string(),
  roleName: z.string(),
  state: z.boolean(),
});

export type ScreenToManageModel = z.infer<typeof SScreenToManageModel>;

export const SScreenToManageResponseModel = SResponseModel.extend({
  data: z.array(SScreenToManageModel),
});

export type ScreenToManageResponseModel = z.infer<
  typeof SScreenToManageResponseModel
>;

export const SScreenToManageResponseSingleModel = SResponseModel.extend({
  data: SScreenToManageModel,
});

export type ScreenToManageResponseSingeModel = z.infer<
  typeof SScreenToManageResponseSingleModel
>;
