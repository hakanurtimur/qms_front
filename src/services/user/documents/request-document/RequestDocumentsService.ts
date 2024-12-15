import api from "@/services/Api";
import {
  RequestDocumentGetModelResponse,
  RequestDocumentListModelResponse,
} from "@/models/user/documents/documents/requestDocument";
import {
  RequestDocumentCreate,
  RequestDocumentCreatedModelResponse,
} from "@/models/user/documents/documents/requestDocumentCreate";
import {
  UpdateDocumentDemandModel,
  UserRequestModelDetailsResponse,
  UserRequestModelResponse,
} from "@/models/user/documents/userRequests/userRequestModel";

// TODO: Seperate as routes

export class RequestDocumentService {
  public async list(
    role_id: string,
  ): Promise<RequestDocumentListModelResponse> {
    return await api.get(`/Document/get-document-list/${role_id}`);
  }

  public async getDocumentDemandList(
    user_id: string,
    role_id: string,
    department_id: string,
  ): Promise<UserRequestModelResponse> {
    return await api.get(
      `/documentdemand/get-document-demand-list/${user_id}/${role_id}/${department_id}`,
    );
  }
  public async getDocumentDemandActiveList(
    user_id: string,
    role_id: string,
    department_id: string,
  ): Promise<UserRequestModelResponse> {
    return await api.get(
      `/documentdemand/get-document-demand-line-list/${user_id}/${role_id}/${department_id}`,
    );
  }

  public async getDocumentDemandDetails(
    document_id: string,
    role_id: string,
  ): Promise<UserRequestModelDetailsResponse> {
    return await api.get(
      `/documentdemand/get-document-demand-by-id/${document_id}/${role_id}`,
    );
  }

  public async updateDocumentDemand(
    user_id: string,
    role_id: string,
    data: UpdateDocumentDemandModel,
  ): Promise<unknown> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    return await api.put(
      `/documentdemand/update-document-demand/${user_id}/${role_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }

  // TODO: remove, this function is in DocumentsGeneralService and we have a hook for named useGetFile

  public async get(file_id: string): Promise<RequestDocumentGetModelResponse> {
    return await api.get(`/Document/get-document-by-id/${file_id}`);
  }

  public async createDocument(data: {
    userId: string;
    formData: RequestDocumentCreate;
  }): Promise<RequestDocumentCreatedModelResponse> {
    const formData = new FormData();

    Object.entries(data.formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    return await api.post(
      `/documentdemand/create-document-request/${data.userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }

  public async reviseDocument(data: {
    userId: string;
    formData: RequestDocumentCreate;
  }): Promise<RequestDocumentCreatedModelResponse> {
    const formData = new FormData();

    Object.entries(data.formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    return await api.post(
      `/documentdemand/revise-document-request/${data.userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }
}

const requestDocumentService = new RequestDocumentService();
export default requestDocumentService;
