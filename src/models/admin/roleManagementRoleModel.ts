import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

export const SRoleManagementRoleModel = z.object({
  roleId: z.number(),
  roleName: z.string(),
  state: z.boolean(),
});

export type RoleManagementRoleModel = z.infer<typeof SRoleManagementRoleModel>;

export const SRoleManagementRoleListResponse = SResponseModel.extend({
  data: z.array(SRoleManagementRoleModel),
});

export type RoleManagementRoleListResponseModel = z.infer<
  typeof SRoleManagementRoleListResponse
>;

export const SRoleManagementRoleResponse = SResponseModel.extend({
  data: SRoleManagementRoleModel,
});

export type RoleManagementRoleResponseModel = z.infer<
  typeof SRoleManagementRoleResponse
>;
