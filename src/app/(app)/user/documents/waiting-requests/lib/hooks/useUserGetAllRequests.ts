import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useQuery } from "@tanstack/react-query";

export const useUserGetAllRequests = (userId: string, roleId: string) => {
  return useQuery({
    queryKey: ["waiting-requests"],
    queryFn: () => waitingRequestsService.list(userId ?? "", roleId ?? ""),
  });
};
