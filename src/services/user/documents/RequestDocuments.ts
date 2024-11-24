import api from "@/services/Api";
import {
  RequestDocumentGetModelResponse,
  RequestDocumentListModelResponse,
} from "@/models/user/documents/documents/requestDocument";

export class RequestDocumentService {
  public async list(
    role_id: string,
  ): Promise<RequestDocumentListModelResponse> {
    return await api.get(`/Document/get-document-list/${role_id}`);
  }
  public async get(file_id: string): Promise<RequestDocumentGetModelResponse> {
    return await api.get(`/Document/get-document-by-id/${file_id}`);
  }
}

const requestDocumentService = new RequestDocumentService();
export default requestDocumentService;
