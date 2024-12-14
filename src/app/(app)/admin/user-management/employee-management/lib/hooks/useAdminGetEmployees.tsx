import { useQuery } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminGetEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => employeeManagementService.listEmployees(),
  });
};
