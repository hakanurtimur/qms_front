import { useQuery } from "@tanstack/react-query";
import managerLocationService from "@/services/admin/Location";

export const useAdminGetLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => managerLocationService.list(),
  });
};
