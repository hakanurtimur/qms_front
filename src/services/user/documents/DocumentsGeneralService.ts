import api from "@/services/Api";
import { RequestDocumentTypeResponse } from "@/models/user/documents/documents/requestDocumentType";
import {
  SuperAdminAboutOptionListResponseModel,
  SuperAdminActionOptionListResponseModel,
  WaitingRequestResponseDetailsModel,
} from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { RequestDocumentGetModelResponse } from "@/models/user/documents/documents/requestDocument";

export class DocumentsGeneralService {
  public async getDocumentTypes(): Promise<RequestDocumentTypeResponse> {
    return await api.get(`/Document/get-document-type-list`);
  }

  public async getActionTypes(role_id: string): Promise<{
    data: { actionId: number; actionName: string }[];
  }> {
    return await api.get(`documentdemand/get-demand-action-list/${role_id}`);
  }

  public async getSuperAdminActionList(): Promise<SuperAdminActionOptionListResponseModel> {
    return await api.get(`/documentdemand/get-demand-superadmin-action-list`);
  }

  public async getSuperAdminAboutList(): Promise<SuperAdminAboutOptionListResponseModel> {
    return await api.get(`/documentdemand/get-demand-superadmin-about-list`);
  }

  public async getGarbage(
    garbage_id: string,
    user_id: string,
  ): Promise<WaitingRequestResponseDetailsModel> {
    return await api.get(
      `/documentdemand/get-garbage-document-by-id/${garbage_id}/${user_id}`,
    );
  }

  public async getFile(
    file_id: string,
  ): Promise<RequestDocumentGetModelResponse> {
    return await api.get(`/Document/get-document-by-id/${file_id}`);
  }
}

const documentsGeneralService = new DocumentsGeneralService();
export default documentsGeneralService;
