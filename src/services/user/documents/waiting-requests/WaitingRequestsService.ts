import api from "@/services/Api";
import {
  UpdateWaitingRequestModel,
  WaitingRequestResponseDetailsModel,
  WaitingRequestResponseModel,
} from "@/models/user/documents/waitingRequests/waitingRequestModel";
import {
  ResultedRequestsFormModel,
  ResultedRequestsReviseFormModel,
} from "@/models/user/documents/waitingRequests/resultedRequestsFormModel";
import { RequestDocumentCreatedModelResponse } from "@/models/user/documents/documents/requestDocumentCreate";
import { RequestDocumentListModelResponse } from "@/models/user/documents/documents/requestDocument";

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
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    console.log(data.formFile);
    console.log("formData :" + formData);

    return await api.put(
      `/documentdemand/update-superadmin-document-demand/${user_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
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
  //api/document/get-category-folder-list
  public async getCategoryFolderList(): Promise<RequestDocumentListModelResponse> {
    return await api.get(`/document/get-category-folder-list`);
  }

  //api/documentdemand/get-hidden-type-list
  public async getHiddenTypeList(): Promise<RequestDocumentCreatedModelResponse> {
    return await api.get(`/documentdemand/get-hidden-type-list`);
  }

  //api/documentdemand/get-issue-type-list
  public async getIssueTypeList(): Promise<RequestDocumentCreatedModelResponse> {
    return await api.get(`/documentdemand/get-issue-type-list`);
  }

  // api/document/upload-document-new/{userId}/{id}
  public async createDocument(
    userId: string,
    id: string,
    body: ResultedRequestsFormModel,
  ): Promise<unknown> {
    const formFile = new FormData();
    Object.entries(body?.formFile).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formFile.append(key, value instanceof File ? value : String(value));
      }
    });

    try {
      return await api.put(
        `/document/upload-document-new/${userId}/${id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  // api/document/upload-document-revise/{userId}/{id}
  public async revizeDocument(
    userId: string,
    id: string,
    body: ResultedRequestsReviseFormModel,
  ): Promise<unknown> {
    console.log("body", body);
    console.log("userId", userId);
    console.log("id", id);
    const formFile = new FormData();
    Object.entries(body?.formFile).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formFile.append(key, value instanceof File ? value : String(value));
      }
    });

    return await api.put(
      `/document/upload-document-revise/${userId}/${id}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }
}

const waitingRequestsService = new WaitingRequestsService();
export default waitingRequestsService;
