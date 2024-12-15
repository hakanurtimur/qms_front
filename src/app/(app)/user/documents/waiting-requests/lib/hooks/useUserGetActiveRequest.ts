import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useQuery } from "@tanstack/react-query";

export const useUserGetActiveRequests = (userId: string, roleId: string) => {
  return useQuery({
    queryKey: ["active-waiting-requests"],
    queryFn: () =>
      waitingRequestsService.listActives(userId ?? "", roleId ?? ""),
  });
};
