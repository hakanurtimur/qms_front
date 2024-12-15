import { UpdateWaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";
import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useMutation } from "@tanstack/react-query";

export const useUserUpdateWaitingRequest = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["update-waiting-request"],
    mutationFn: (args: { data: UpdateWaitingRequestModel; userId: string }) =>
      waitingRequestsService.update(args.userId ?? "", args.data),
    onSuccess: onSuccess,
    onError: onError,
  });
};
