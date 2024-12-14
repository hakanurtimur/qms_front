import { useMutation } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminUpdateManagerDepartment = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["update-manager-department"],
    mutationFn: (args: {
      id: string;
      data: {
        id: number;
        departmentId: number;
      };
    }) => employeeManagementService.addDepartmentToManager(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
