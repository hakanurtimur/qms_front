import { useQuery } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminGetDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: () => employeeManagementService.getDepartments(),
  });
};
