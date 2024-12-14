import { useMutation } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminUpdateEmployee = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["update-employee"],
    mutationFn: (args: {
      id: string;
      data: {
        id: number;
        roleId: number;
      };
    }) => employeeManagementService.updateEmployee(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
