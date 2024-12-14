import { useQuery } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminGetManagers = () => {
  return useQuery({
    queryKey: ["management", "managers"],
    queryFn: () => employeeManagementService.listManagers(),
  });
};
