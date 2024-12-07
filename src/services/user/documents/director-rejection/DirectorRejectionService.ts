import api from "@/services/Api";
import {
  DirectorRejectionResponseDetailsModel,
  DirectorRejectionResponseModel,
} from "@/models/user/documents/director-rejection/director-rejection";

export class DirectorRejectionService {
  public async list(
    user_id: string,
    role_id: string,
  ): Promise<DirectorRejectionResponseModel> {
    return await api.get(
      `/documentdemand/get-administrator-document-demand-list/${user_id}/${role_id}`,
    );
  }
  public async listActives(
    user_id: string,
    role_id: string,
  ): Promise<DirectorRejectionResponseModel> {
    return await api.get(
      `/documentdemand/get-administrator-document-demand-line-list/${user_id}/${role_id}`,
    );
  }

  public async getDetails(
    id: string,
    role_id: string,
  ): Promise<DirectorRejectionResponseDetailsModel> {
    return await api.get(
      `/documentdemand/get-administrator-document-demand-by-id/${id}/${role_id}`,
    );
  }

  public async approvement(
    user_id: string,
    id: number,
    action_id: number,
  ): Promise<DirectorRejectionResponseDetailsModel> {
    return await api.put(
      `documentdemand/update-administrator-document-demand/${user_id}`,
      {
        id: id,
        administratorActionId: action_id,
      },
    );
  }
}

const directorRejectionService = new DirectorRejectionService();
export default directorRejectionService;
