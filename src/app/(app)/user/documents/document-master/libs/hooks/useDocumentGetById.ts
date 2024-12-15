import documentsGeneralService from "@/services/user/documents/document-master/DocumentMasterService";
import { useMutation } from "@tanstack/react-query";
import { DocumentMasterMainSheetModalResponse } from "@/models/user/documents/document-master/DocumentMasterModels";

interface DocumentGetByIdProps {
  id: string;
  key: string[];
}

const useDocumentGetById = ({ id, key }: DocumentGetByIdProps) => {
  const getDocumentById = useMutation<DocumentMasterMainSheetModalResponse>({
    mutationKey: key,
    mutationFn: () => documentsGeneralService.getDocumentMainById(id),
  });

  return getDocumentById;
};

export default useDocumentGetById;
