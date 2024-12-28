import { useQuery } from "@tanstack/react-query";
import moduleManagementService from "@/services/admin/user-management/module-management/ModuleManagementService";

export const useAdminGetModules = () => {
  return useQuery({
    queryKey: ["admin-get-modules"],
    queryFn: () => moduleManagementService.list(),
  });
};
