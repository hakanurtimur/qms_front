import api from "@/services/Api";
import {
  ModuleToManageResponseModel,
  ModuleToManageResponseSingeModel,
} from "@/models/admin/moduleManagement/moduleToManageModel";

export class ModuleManagementService {
  public async list(): Promise<ModuleToManageResponseModel> {
    return await api.get(`/module`);
  }

  public async get(id: number): Promise<ModuleToManageResponseSingeModel> {
    return await api.get(`/module/${id}`);
  }

  public async update(args: {
    userId: string;
    data: {
      id: number;
      state: boolean;
    };
  }): Promise<unknown> {
    return await api.put(`/module/${args.userId}`, args.data);
  }
}

const moduleManagementService = new ModuleManagementService();
export default moduleManagementService;
