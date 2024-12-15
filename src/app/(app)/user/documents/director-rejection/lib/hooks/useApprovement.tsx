"use client";

import { useMutation } from "@tanstack/react-query";
import directorRejectionService from "@/services/user/documents/director-rejection/DirectorRejectionService";

const useApprovement = (
  user_id: string,
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["approve"],
    mutationFn: async (data: { action_id: number; id: string }) =>
      directorRejectionService.approvement(user_id, +data.id, data.action_id),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useApprovement;
