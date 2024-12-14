import { useQuery } from "@tanstack/react-query";
import actionHistory from "@/services/admin/ActionHistory";

export const useAdminGetActionHistory = () => {
  return useQuery({
    queryKey: ["action-history"],
    queryFn: () => actionHistory.list(),
  });
};
