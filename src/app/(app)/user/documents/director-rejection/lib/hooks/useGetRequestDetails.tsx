"use client";

import { useQuery } from "@tanstack/react-query";
import directorRejectionService from "@/services/user/documents/director-rejection/DirectorRejectionService";

const useListRequests = (id: string, role_id: string) => {
  const query = useQuery({
    queryKey: ["rejectionRequest", id],
    queryFn: async () => directorRejectionService.getDetails(id, role_id),
  });

  return { query };
};

export default useListRequests;
