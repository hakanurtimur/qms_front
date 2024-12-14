import { useQuery } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminGetSingleEmployee = (id: number) => {
  return useQuery({
    queryKey: ["single-employee", id],
    queryFn: () => employeeManagementService.getEmployee(id.toString()),
  });
};
