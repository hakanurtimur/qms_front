import api from "@/services/Api";
import {
  RoleManagementRoleListResponseModel,
  RoleManagementRoleResponseModel,
} from "@/models/admin/roleManagementRoleModel";

export class RoleManagementService {
  public async list(): Promise<RoleManagementRoleListResponseModel> {
    return await api.get(`/role`);
  }

  public async get(id: string): Promise<RoleManagementRoleResponseModel> {
    return await api.get(`/role/${id}`);
  }

  public async update(args: {
    userId: string;
    data: {
      roleId: number;
      state: boolean;
    };
  }): Promise<RoleManagementRoleResponseModel> {
    return await api.put(`/role/update-state/${args.userId}`, {
      userId: args.userId,
      ...args.data,
    });
  }
  public async add(args: {
    userId: string;
    data: {
      roleName: string;
    };
  }): Promise<RoleManagementRoleResponseModel> {
    return await api.post(`/role/${args.userId}`, {
      userId: args.userId,
      ...args.data,
    });
  }

  // public async update(args: {
  //   userId: string;
  //   data: ManagerLocationModel;
  // }): Promise<unknown> {
  //   return await api.put(`/location/${args.userId}`, {
  //     userId: args.userId,
  //     ...args.data,
  //   });
  // }
}

const roleManagementService = new RoleManagementService();
export default roleManagementService;
