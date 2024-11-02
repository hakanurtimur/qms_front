import api from "@/services/Api";
import { ActionHistoryResponseModel } from "@/models/admin/actionHistory";

export class ActionHistoryService {
  public async list(): Promise<ActionHistoryResponseModel> {
    return await api.get(`/actionHistory`);
  }
}

const actionHistoryService = new ActionHistoryService();
export default actionHistoryService;
