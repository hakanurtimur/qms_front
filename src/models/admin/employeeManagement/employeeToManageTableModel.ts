import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SEmployeeToManageTableModel = z.object({
  id: z.number(),
  userId: z.number().optional(),
  username: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  surname: z.string().nullable().optional(),
  nameSurname: z.string(),
  ticketName: z.string().nullable().optional(),
  titleName: z.string().nullable(),
  titleId: z.number().optional(),
  jobId: z.number(),
  jobName: z.string(),
  departmentId: z.number(),
  departmentName: z.string().optional().nullable(),
  roleId: z.number(),
  roleName: z.string().nullable(),
  mail: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  workingStatus: z.boolean(),
});

export type EmployeeToManageTableModel = z.infer<
  typeof SEmployeeToManageTableModel
>;

export const SEmployeeToManageTableResponse = SResponseModel.extend({
  data: z.array(SEmployeeToManageTableModel),
});

export type EmployeeToManageTableResponseModel = z.infer<
  typeof SEmployeeToManageTableResponse
>;

export const SEmployeeToManageResponse = SResponseModel.extend({
  data: SEmployeeToManageTableModel,
});

export type EmployeeToManageResponseModel = z.infer<
  typeof SEmployeeToManageResponse
>;

export const SEmployeeToManageRequest = z.object({
  userId: z.number(),
  roleId: z.number(),
  departmentId: z.number(),
  workingStatus: z.boolean(),
});
