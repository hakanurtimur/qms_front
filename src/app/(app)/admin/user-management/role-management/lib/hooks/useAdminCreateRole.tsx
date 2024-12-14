import { useMutation } from "@tanstack/react-query";
import roleManagementService from "@/services/admin/RoleManagement";

export const useAdminCreateRole = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["create-role"],
    mutationFn: (args: {
      userId: string;
      data: {
        roleName: string;
      };
    }) => roleManagementService.add(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
