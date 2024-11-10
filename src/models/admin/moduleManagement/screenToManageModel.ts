import { z } from "zod";

export const SScreenToManageModel = z.object({
  typeName: z.string(),
  moduleName: z.string(),
  subModuleName: z.string(),
  roleName: z.string(),
  state: z.boolean(),
});

export type ScreenToManageModel = z.infer<typeof SScreenToManageModel>;
