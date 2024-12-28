import { useMutation } from "@tanstack/react-query";
import moduleManagementService from "@/services/admin/user-management/module-management/ModuleManagementService";

export const useAdminUpdateModule = (
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
    }) => moduleManagementService.update(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
