import api from "@/services/Api";
import {
  EmployeeToManageResponseModel,
  EmployeeToManageTableResponseModel,
} from "@/models/admin/employeeManagement/employeeToManageTableModel";
import { EmployeeRolesResponse } from "@/models/admin/employeeManagement/roles";
import { GuestCreated } from "@/models/admin/employeeManagement/guest";

export class EmployeeManagementService {
  public async listEmployees(): Promise<EmployeeToManageTableResponseModel> {
    return await api.get(`/user/get-employee`);
  }
  public async getEmployee(id: string): Promise<EmployeeToManageResponseModel> {
    return await api.get(`/user/get-employee/${id}`);
  }
  public async getEmployeeRoles(): Promise<EmployeeRolesResponse> {
    return await api.get(`/role/manager-by-list`);
  }
  public async updateEmployee(args: {
    id: string;
    data: {
      id: number;
      roleId: number;
    };
  }): Promise<unknown> {
    return await api.put(`/userResource/${args.id}`, {
      userId: +args.id,
      ...args.data,
    });
  }

  public async addGuest(args: {
    userId: string;
    data: GuestCreated;
  }): Promise<unknown> {
    return await api.post(`/user/insert-guest/${args.userId}`, {
      userId: +args.userId,
      ...args.data,
    });
  }
}

const employeeManagementService = new EmployeeManagementService();
export default employeeManagementService;
