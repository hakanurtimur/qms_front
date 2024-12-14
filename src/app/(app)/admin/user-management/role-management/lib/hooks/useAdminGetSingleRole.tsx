import { useQuery } from "@tanstack/react-query";
import roleManagementService from "@/services/admin/RoleManagement";

export const useAdminGetSingleRole = (roleId: number) => {
  return useQuery({
    queryKey: ["single-role", roleId],
    queryFn: () => roleManagementService.get(roleId.toString()),
  });
};
