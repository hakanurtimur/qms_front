import documentsGeneralService from "@/services/user/documents/document-master/DocumentMasterService";
import { useQuery } from "@tanstack/react-query";
import { DocumentMasterMainModalResponse } from "@/models/user/documents/document-master/DocumentMasterModels";

interface DocumentMainListProps {
  key: string[];
}

const useDocumentMainList = ({ key }: DocumentMainListProps = { key: [] }) => {
  const getDocumentMainList = useQuery<DocumentMasterMainModalResponse>({
    queryKey: key,
    queryFn: () => documentsGeneralService.getDocumentMainList(),
  });
  return getDocumentMainList;
};

export default useDocumentMainList;
