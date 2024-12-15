import requestDocumentService from "@/services/user/documents/request-document/RequestDocumentsService";
import { useQuery } from "@tanstack/react-query";

export const useUserGetAllRequests = (
  userId: string,
  roleId: string,
  departmentId: string,
) => {
  return useQuery({
    queryKey: ["documents", "all"],
    queryFn: () =>
      requestDocumentService.getDocumentDemandList(
        userId,
        roleId,
        departmentId,
      ),
  });
};
