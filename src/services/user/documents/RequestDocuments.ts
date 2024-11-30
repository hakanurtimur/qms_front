import api from "@/services/Api";
import {
  RequestDocumentGetModelResponse,
  RequestDocumentListModelResponse,
} from "@/models/user/documents/documents/requestDocument";
import { RequestDocumentTypeResponse } from "@/models/user/documents/documents/requestDocumentType";
import {
  RequestDocumentCreate,
  RequestDocumentCreatedModelResponse,
} from "@/models/user/documents/documents/requestDocumentCreate";
import { WaitingRequestResponseDetailsModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";

export class RequestDocumentService {
  public async list(
    role_id: string,
  ): Promise<RequestDocumentListModelResponse> {
    return await api.get(`/Document/get-document-list/${role_id}`);
  }

  public async get(file_id: string): Promise<RequestDocumentGetModelResponse> {
    return await api.get(`/Document/get-document-by-id/${file_id}`);
  }

  public async getGarbage(
    garbage_id: string,
    user_id: string,
  ): Promise<WaitingRequestResponseDetailsModel> {
    return await api.get(
      `/documentdemand/get-garbage-document-by-id/${garbage_id}/${user_id}`,
    );
  }

  public async getDocumentTypes(): Promise<RequestDocumentTypeResponse> {
    return await api.get(`/Document/get-document-type-list`);
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
