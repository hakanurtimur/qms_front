import api from "@/services/Api";
import {
  SuperAdminAboutOptionListResponseModel,
  SuperAdminActionOptionListResponseModel,
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

  public async getSuperAdminActionList(): Promise<SuperAdminActionOptionListResponseModel> {
    return await api.get(`/documentdemand/get-demand-superadmin-action-list`);
  }

  public async getSuperAdminAboutList(): Promise<SuperAdminAboutOptionListResponseModel> {
    return await api.get(`/documentdemand/get-demand-superadmin-about-list`);
  }
}

const waitingRequestsService = new WaitingRequestsService();
export default waitingRequestsService;
