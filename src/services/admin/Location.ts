import api from "@/services/Api";
import {
  ManagerLocationModel,
  ManagerLocationResponseModel,
} from "@/models/admin/location";

export class ManagerLocationService {
  public async list(): Promise<ManagerLocationResponseModel> {
    return await api.get(`/location/get-by-manager-list`);
  }
  public async update(args: {
    userId: string;
    data: ManagerLocationModel;
  }): Promise<unknown> {
    return await api.put(`/location/${args.userId}`, {
      userId: args.userId,
      ...args.data,
    });
  }
}

const managerLocationService = new ManagerLocationService();
export default managerLocationService;
