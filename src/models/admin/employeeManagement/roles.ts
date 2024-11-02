import { z } from "zod";

export const SEmployeeRole = z.object({
  roleId: z.number(),
  roleName: z.string(),
  state: z.boolean(),
});

export type EmployeeRole = z.infer<typeof SEmployeeRole>;

export const SEmployeeRolesResponse = z.object({
  data: z.array(SEmployeeRole),
});

export type EmployeeRolesResponse = z.infer<typeof SEmployeeRolesResponse>;
