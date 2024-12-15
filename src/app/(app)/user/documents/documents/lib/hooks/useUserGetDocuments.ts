import requestDocumentService from "@/services/user/documents/request-document/RequestDocumentsService";
import { useQuery } from "@tanstack/react-query";

export const useUserGetDocuments = (roleId: string) => {
  return useQuery({
    queryKey: ["user-documents-list"],
    queryFn: () => requestDocumentService.list(roleId ?? ""),
  });
};
