import { useQuery } from "@tanstack/react-query";
import screenManagementService from "@/services/admin/user-management/module-management/ScreenManagementService";

export const useAdminGetSingleScreen = (id: number) => {
  return useQuery({
    queryKey: ["admin-get-screen", id],
    queryFn: () => screenManagementService.get(id),
  });
};
