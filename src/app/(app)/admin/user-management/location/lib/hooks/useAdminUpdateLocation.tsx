import { useMutation } from "@tanstack/react-query";
import { ManagerLocationModel } from "@/models/admin/location";
import managerLocationService from "@/services/admin/Location";

export const useAdminUpdateLocation = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["update-manager-location"],
    mutationFn: (args: { userId: string; data: ManagerLocationModel }) =>
      managerLocationService.update(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
