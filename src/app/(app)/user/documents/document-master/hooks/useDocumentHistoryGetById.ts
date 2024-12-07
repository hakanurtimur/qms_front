import documentsGeneralService from "@/services/user/documents/document-master/DocumentMasterService";
import { useMutation } from "@tanstack/react-query";

interface DocumentHistoryGetByIdProps {
  id: string;
  key: string[];
}

const useDocumentHistoryGetById = ({
  id,
  key,
}: DocumentHistoryGetByIdProps) => {
  const getDocumentHistoryById = useMutation({
    mutationKey: key,
    mutationFn: () => documentsGeneralService.getDocumentMasterHistoryById(id),
  });

  return getDocumentHistoryById;
};

export default useDocumentHistoryGetById;
