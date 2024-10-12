import { z } from "zod";

export const SModule = z.object({
  moduleId: z.number(),
  moduleName: z.string(),
});

export type Module = z.infer<typeof SModule>;

export const SLocationData = z.object({
  data: z.array(SModule),
  statusCode: z.number(),
  error: z.string().optional().nullable(),
});

export type ModuleData = z.infer<typeof SLocationData>;
