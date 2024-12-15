"use client";

import { useQuery } from "@tanstack/react-query";
import directorRejectionService from "@/services/user/documents/director-rejection/DirectorRejectionService";

const useGetSingleRejectionRequest = (id: string, role_id: string) => {
  return useQuery({
    queryKey: ["rejection-requests", id],
    queryFn: async () => directorRejectionService.getDetails(id, role_id),
  });
};

export default useGetSingleRejectionRequest;
