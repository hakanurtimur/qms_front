import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SEmployeeToManageTableModel = z.object({
  id: z.number(),
  userId: z.number(),
  username: z.string().nullable(),
  name: z.string().nullable(),
  surname: z.string().nullable(),
  nameSurname: z.string(),
  ticketName: z.string().nullable(),
  titleName: z.string(),
  titleId: z.number(),
  jobId: z.number(),
  jobName: z.string(),
  departmentId: z.number(),
  departmentName: z.string(),
  roleId: z.number(),
  roleName: z.string(),
  mail: z.string(),
  phoneNumber: z.string(),
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
