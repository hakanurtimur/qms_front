import { z } from "zod";

export const SEmployeeDepartment = z.object({
  departmentId: z.number(),
  departmentName: z.string(),
});

export type EmployeeDepartment = z.infer<typeof SEmployeeDepartment>;

export const SEmployeeDepartmentResponse = z.object({
  data: z.array(SEmployeeDepartment),
});

export type EmployeeDepartmentResponse = z.infer<
  typeof SEmployeeDepartmentResponse
>;
