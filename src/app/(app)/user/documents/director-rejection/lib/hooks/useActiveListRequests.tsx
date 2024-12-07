"use client";

import { useQuery } from "@tanstack/react-query";
import directorRejectionService from "@/services/user/documents/director-rejection/DirectorRejectionService";

const useActiveListRequests = (user_id: string, role_id: string) => {
  const query = useQuery({
    queryKey: ["activeRejectionRequests"],
    queryFn: async () => directorRejectionService.listActives(user_id, role_id),
  });

  return { query };
};

export default useActiveListRequests;
