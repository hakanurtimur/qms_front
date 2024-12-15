import requestDocumentService from "@/services/user/documents/request-document/RequestDocumentsService";
import { useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
  roleId: string;
  departmentId: string;
}
export const useUserGetActiveRequests = ({
  userId,
  roleId,
  departmentId,
}: Props) => {
  return useQuery({
    queryKey: ["documents", "actives"],
    queryFn: () =>
      requestDocumentService.getDocumentDemandActiveList(
        userId,
        roleId,
        departmentId,
      ),
  });
};
