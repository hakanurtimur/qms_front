import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useQuery } from "@tanstack/react-query";

export const useUserGetResultesRequests = (userId: string, roleId: string) => {
  return useQuery({
    queryKey: ["resulted-requests"],
    queryFn: () =>
      waitingRequestsService.getResultedRequests(userId ?? "", roleId ?? ""),
  });
};
