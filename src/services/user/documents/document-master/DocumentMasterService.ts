import {
  DocumentMasterHistoryModelRequest,
  DocumentMasterHistoryResponseModel,
  DocumentMasterMainModalResponse,
  DocumentMasterMainSheetModalResponse,
  DocumentMasterMainSheetModelRequest,
} from "@/models/user/documents/document-master/DocumentMasterModels";
import api from "@/services/Api";

export class DocumentMasterService {
  public async getDocumentMainList(): Promise<DocumentMasterMainModalResponse> {
    //api/documentmaster/get-document-master-main-list
    return await api.get(`/documentmaster/get-document-master-main-list`);
  }

  //HTTP GET: api/documentmaster/get-document-master-main-by-id/{id}
  public async getDocumentMainById(
    id: string,
  ): Promise<DocumentMasterMainSheetModalResponse> {
    return await api.get(
      `/documentmaster/get-document-master-main-by-id/${id}`,
    );
  }

  //HTTP PUT: api/documentmaster/update-document-master-history/{id}
  public async updateDocumentMasterHistory(
    id: string,
    data: DocumentMasterMainSheetModelRequest,
  ): Promise<void> {
    return await api.post(
      `/documentmaster/update-document-master-history/${id}`,
      data,
    );
  }

  //HTTP GET: api/documentmaster/get-document-master-history-list/{code})
  public async getDocumentMasterHistoryList(
    code: string,
  ): Promise<DocumentMasterHistoryResponseModel> {
    return await api.get(
      `/documentmaster/get-document-master-history-list/${code}`,
    );
  }

  //HTTP GET: api/documentmaster/get-document-master-history-by-id/{id}
  public async getDocumentMasterHistoryById(
    id: string,
  ): Promise<DocumentMasterHistoryResponseModel> {
    return await api.get(
      `/documentmaster/get-document-master-history-by-id/${id}`,
    );
  }
  //HTTP POST: api/documentmaster/update-document-master-history-detail/{id}
  public async updateDocumentMasterHistoryDetail(
    id: string,
    data: DocumentMasterHistoryModelRequest,
  ): Promise<void> {
    return await api.post(
      `/documentmaster/update-document-master-history-detail/${id}`,
      data,
    );
  }
}

const documentsGeneralService = new DocumentMasterService();
export default documentsGeneralService;
