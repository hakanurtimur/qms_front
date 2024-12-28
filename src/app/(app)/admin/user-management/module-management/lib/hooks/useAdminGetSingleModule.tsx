import { useQuery } from "@tanstack/react-query";
import moduleManagementService from "@/services/admin/user-management/module-management/ModuleManagementService";

export const useAdminGetSingleModule = (id: number) => {
  return useQuery({
    queryKey: ["admin-get-module", id],
    queryFn: () => moduleManagementService.get(id),
  });
};
