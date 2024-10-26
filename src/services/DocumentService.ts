import api from "@/services/Api";
import { DocumentApiResponse, DocumentApiResponseUrl } from "@/models/document";

export class DocumentService {
  public async getDocuments(id: string): Promise<DocumentApiResponse> {
    return await api.get(`/Document/get-non-login-list/${id}`);
  }
  public async goDoc(fileId: string): Promise<DocumentApiResponseUrl> {
    return await api.get(`/Document/get-non-login-by-id/${fileId}`);
  }
}

const documentService = new DocumentService();
export default documentService;
