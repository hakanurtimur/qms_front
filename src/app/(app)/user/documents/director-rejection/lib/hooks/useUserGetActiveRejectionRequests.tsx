"use client";

import { useQuery } from "@tanstack/react-query";
import directorRejectionService from "@/services/user/documents/director-rejection/DirectorRejectionService";

const useUserGetActiveRejectionRequests = (
  user_id: string,
  role_id: string,
) => {
  return useQuery({
    queryKey: ["active-rejection-requests"],
    queryFn: async () => directorRejectionService.listActives(user_id, role_id),
  });
};

export default useUserGetActiveRejectionRequests;
