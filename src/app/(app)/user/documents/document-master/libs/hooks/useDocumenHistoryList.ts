import documentsGeneralService from "@/services/user/documents/document-master/DocumentMasterService";
import { useMutation } from "@tanstack/react-query";
import { DocumentMasterHistoryResponseModel } from "@/models/user/documents/document-master/DocumentMasterModels";

interface DocumentHistoryListProps {
  code: string;
  key: string[];
}

const useDocumentHistoryList = ({ code, key }: DocumentHistoryListProps) => {
  const getDocumentHistoryList =
    useMutation<DocumentMasterHistoryResponseModel>({
      mutationKey: key,
      mutationFn: () =>
        documentsGeneralService.getDocumentMasterHistoryList(code),
    });
  return getDocumentHistoryList;
};

export default useDocumentHistoryList;
