import api from "@/services/Api";
import {
  DocumentApiResponse,
  DocumentApiResponseUrl,
  DocumentCategoryListResponseModel,
  DocumentFolderListResponseModel,
} from "@/models/document";

export class DocumentService {
  public async getDocuments(id: string): Promise<DocumentApiResponse> {
    return await api.get(`/Document/get-non-login-list/${id}`);
  }
  public async goDoc(fileId: string): Promise<DocumentApiResponseUrl> {
    return await api.get(`/Document/get-non-login-by-id/${fileId}`);
  }

  /*
    HTTP GET: api/document/document-category-get-list

    RESPONSE:

    CategoryId INT
    CategoryName STRING
  */

  public async getDocumentCategories(): Promise<DocumentCategoryListResponseModel> {
    return await api.get("/document/document-category-get-list");
  }

  /*
    HTTP GET: api/document/document-folder-get-list/{categoryId}

    RESPONSE:

    CategoryId INT
    FolderName STRING
  */

  public async getDocumentFolders(
    categoryId: number,
  ): Promise<DocumentFolderListResponseModel> {
    return await api.get(`/document/document-folder-get-list/${categoryId}`);
  }
}

const documentService = new DocumentService();
export default documentService;
