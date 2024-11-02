import api from "@/services/Api";
import {
  EmployeeToManageResponseModel,
  EmployeeToManageTableResponseModel,
} from "@/models/admin/employeeManagement/employeeToManageTableModel";
import { EmployeeRolesResponse } from "@/models/admin/employeeManagement/roles";
import { GuestCreated } from "@/models/admin/employeeManagement/guest";
import { EmployeeDepartmentResponse } from "@/models/admin/employeeManagement/departments";

export class EmployeeManagementService {
  // Employee Management Service

  public async listEmployees(): Promise<EmployeeToManageTableResponseModel> {
    return await api.get(`/user/get-employee`);
  }

  public async getEmployee(id: string): Promise<EmployeeToManageResponseModel> {
    return await api.get(`/user/get-employee/${id}`);
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

  // Guest Management Service

  public async addGuest(args: {
    userId: string;
    data: GuestCreated;
  }): Promise<unknown> {
    return await api.post(`/user/insert-guest/${args.userId}`, {
      userId: +args.userId,
      ...args.data,
    });
  }

  // Manager Management Service

  public async listManagers(): Promise<EmployeeToManageTableResponseModel> {
    return await api.get(`/userHead`);
  }

  public async getManager(id: string): Promise<EmployeeToManageResponseModel> {
    return await api.get(`/userHead/${id}`);
  }

  public async updateManager(args: {
    id: string;
    data: {
      id: number;
      roleId: number;
      departmentId: number;
      state: boolean;
    };
  }): Promise<unknown> {
    return await api.put(`/userHead/${args.id}`, {
      userId: +args.id,
      ...args.data,
    });
  }
  public async addDepartmentToManager(args: {
    id: string;
    data: {
      id: number;
      departmentId: number;
    };
  }): Promise<unknown> {
    return await api.post(`/userHead/${args.id}`, {
      userId: +args.id,
      ...args.data,
    });
  }

  // roles

  public async getEmployeeRoles(): Promise<EmployeeRolesResponse> {
    return await api.get(`/role/manager-by-list`);
  }

  // departments

  public async getDepartments(): Promise<EmployeeDepartmentResponse> {
    return await api.get(`/department`);
  }
}

const employeeManagementService = new EmployeeManagementService();
export default employeeManagementService;
