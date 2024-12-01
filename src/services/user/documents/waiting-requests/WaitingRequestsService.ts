import api from "@/services/Api";
import {
  UpdateWaitingRequestModel,
  WaitingRequestResponseDetailsModel,
  WaitingRequestResponseModel,
} from "@/models/user/documents/waitingRequests/waitingRequestModel";

export class WaitingRequestsService {
  public async list(
    user_id: string,
    role_id: string,
  ): Promise<WaitingRequestResponseModel> {
    return await api.get(
      `/documentdemand/get-superadmin-document-demand-list/${user_id}/${role_id}`,
    );
  }
  public async listActives(
    user_id: string,
    role_id: string,
  ): Promise<WaitingRequestResponseModel> {
    return await api.get(
      `/documentdemand/get-superadmin-document-demand-line-list/${user_id}/${role_id}`,
    );
  }

  public async get(
    id: string,
    role_id: string,
  ): Promise<WaitingRequestResponseDetailsModel> {
    return await api.get(
      `/documentdemand/get-superadmin-document-demand-by-id/${id}/${role_id}`,
    );
  }

  public async update(
    user_id: string,
    data: UpdateWaitingRequestModel,
  ): Promise<unknown> {
    return await api.put(
      `/documentdemand/update-superadmin-document-demand/${user_id}`,
      data,
    );
  }

  public async getResultedRequests(
    user_id: string,
    role_id: string,
  ): Promise<WaitingRequestResponseModel> {
    return await api.get(
      `/documentdemand/get-superadmin-document-demand-resulted-list/${user_id}/${role_id}`,
    );
  }
}

const waitingRequestsService = new WaitingRequestsService();
export default waitingRequestsService;
