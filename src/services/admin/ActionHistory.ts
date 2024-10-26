import api from "@/services/Api";
import { ActionHistoryResponseModel } from "@/models/admin/actionHistory";

export class ManagerLocationService {
  public async list(): Promise<ActionHistoryResponseModel> {
    return await api.get(`/actionHistory`);
  }
}

const actionHistoryService = new ManagerLocationService();
export default actionHistoryService;
