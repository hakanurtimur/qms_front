import { useQuery } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";

export const useAdminGetSingleManager = (id: number) => {
  return useQuery({
    queryKey: ["single-manager", id],
    queryFn: () => employeeManagementService.getManager(id.toString()),
  });
};
