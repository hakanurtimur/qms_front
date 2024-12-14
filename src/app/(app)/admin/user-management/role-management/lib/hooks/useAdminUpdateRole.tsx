import { useMutation } from "@tanstack/react-query";
import roleManagementService from "@/services/admin/RoleManagement";

export const useAdminUpdateRole = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["update-role"],
    mutationFn: (args: {
      userId: string;
      data: {
        roleName: string;
        roleId: number;
        state: boolean;
      };
    }) => roleManagementService.update(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
