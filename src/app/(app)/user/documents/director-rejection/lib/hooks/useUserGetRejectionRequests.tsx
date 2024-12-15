"use client";

import { useQuery } from "@tanstack/react-query";
import directorRejectionService from "@/services/user/documents/director-rejection/DirectorRejectionService";

const useUserGetRejectionRequests = (user_id: string, role_id: string) => {
  return useQuery({
    queryKey: ["rejection-requests"],
    queryFn: async () => directorRejectionService.list(user_id, role_id),
  });
};

export default useUserGetRejectionRequests;
