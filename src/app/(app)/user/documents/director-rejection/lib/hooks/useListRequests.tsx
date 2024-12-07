"use client";

import { useQuery } from "@tanstack/react-query";
import directorRejectionService from "@/services/user/documents/director-rejection/DirectorRejectionService";

const useListRequests = (user_id: string, role_id: string) => {
  const query = useQuery({
    queryKey: ["rejectionRequests"],
    queryFn: async () => directorRejectionService.list(user_id, role_id),
  });

  return { query };
};

export default useListRequests;
