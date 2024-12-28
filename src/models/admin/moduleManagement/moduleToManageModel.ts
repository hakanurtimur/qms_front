import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SModuleToManageModel = z.object({
  id: z.number().optional(),
  moduleName: z.string(),
  state: z.boolean(),
});

export type ModuleToManageModel = z.infer<typeof SModuleToManageModel>;

export const SModuleToManageResponseModel = SResponseModel.extend({
  data: z.array(SModuleToManageModel),
});

export type ModuleToManageResponseModel = z.infer<
  typeof SModuleToManageResponseModel
>;
export const SModuleToManageResponseSingleModel = SResponseModel.extend({
  data: SModuleToManageModel,
});

export type ModuleToManageResponseSingeModel = z.infer<
  typeof SModuleToManageResponseSingleModel
>;
