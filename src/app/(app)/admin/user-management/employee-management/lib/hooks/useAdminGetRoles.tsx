import { useQuery } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminGetRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => employeeManagementService.getEmployeeRoles(),
  });
};
