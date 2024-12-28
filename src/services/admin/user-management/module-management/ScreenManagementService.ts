import api from "@/services/Api";
import {
  ScreenToManageResponseModel,
  ScreenToManageResponseSingeModel,
} from "@/models/admin/moduleManagement/screenToManageModel";

export class ScreenManagementService {
  public async list(): Promise<ScreenToManageResponseModel> {
    return await api.get(`/rolemodule`);
  }

  public async get(id: number): Promise<ScreenToManageResponseSingeModel> {
    return await api.get(`/rolemodule/${id}`);
  }

  public async update(args: {
    userId: string;
    data: {
      id: number;
      state: boolean;
    };
  }): Promise<unknown> {
    return await api.put(`/rolemodule/update-state/${args.userId}`, args.data);
  }
}

const screenManagementService = new ScreenManagementService();
export default screenManagementService;
