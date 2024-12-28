import { useMutation } from "@tanstack/react-query";
import screenManagementService from "@/services/admin/user-management/module-management/ScreenManagementService";

export const useAdminUpdateScreen = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["update-employee"],
    mutationFn: (args: {
      userId: string;
      data: {
        id: number;
        state: boolean;
      };
    }) => screenManagementService.update(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
