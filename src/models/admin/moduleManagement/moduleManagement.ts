import { z } from "zod";

export const SModuleToManageModel = z.object({
  moduleName: z.string(),
  state: z.boolean(),
});

export type ModuleToManageModel = z.infer<typeof SModuleToManageModel>;
