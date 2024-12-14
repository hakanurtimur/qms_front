import { useQuery } from "@tanstack/react-query";
import roleManagementService from "@/services/admin/RoleManagement";

export const useAdminGetRolesList = () => {
  return useQuery({
    queryKey: ["roles-list"],
    queryFn: () => roleManagementService.list(),
  });
};
