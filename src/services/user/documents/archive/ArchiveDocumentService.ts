import api from "@/services/Api";
import { RequestDocumentListModelResponse } from "@/models/user/documents/documents/requestDocument";
export class ArchiveDocumentService {
  /**
   * API Endpoint : api/document/get-document-archive-file-list
   *
   * Http Method : HttpGet
   *
   * Request :
   *
   * Response :
   *
   * {
   *   FileId: string;
   *   CategoryName: string;
   *   FolderName: string;
   *   FileName: string;
   *   State: string;
   * }
   */
  public async list(): Promise<RequestDocumentListModelResponse> {
    return await api.get(`document/get-document-file-list`);
  }

  /*
      API Endpoint :  api/document/update-document-archive/{userId}

      Http Method : HttpPut

      Request :

      {UserId INT

      FileId INT

      State BIT}

      Response :

      200 Success
    */

  public async updateDocumentArchive(data: {
    userId: string;
    fileId: number;
    state: boolean;
  }): Promise<void> {
    return await api.put(
      `document/update-document-archive/${data.userId}`,
      data,
    );
  }
}

const archiveDocumentService = new ArchiveDocumentService();

export default archiveDocumentService;
