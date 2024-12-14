import { useMutation } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminUpdateManager = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["update-manager"],
    mutationFn: (args: {
      id: string;
      data: {
        id: number;
        roleId: number;
        departmentId: number;
        state: boolean;
      };
    }) => employeeManagementService.updateManager(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
