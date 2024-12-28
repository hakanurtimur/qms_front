import { useQuery } from "@tanstack/react-query";
import screenManagementService from "@/services/admin/user-management/module-management/ScreenManagementService";

export const useAdminGetScreens = () => {
  return useQuery({
    queryKey: ["admin-get-screens"],
    queryFn: () => screenManagementService.list(),
  });
};
