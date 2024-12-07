"use client";

import { useMutation } from "@tanstack/react-query";
import directorRejectionService from "@/services/user/documents/director-rejection/DirectorRejectionService";
import { toast } from "@/hooks/use-toast";

const useApprovement = (user_id: string) => {
  const mutaiton = useMutation({
    mutationKey: ["approve"],
    mutationFn: async (data: { action_id: number; id: string }) =>
      directorRejectionService.approvement(user_id, +data.id, data.action_id),
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "İşlem başarılı",
        variant: "success",
      });
    },
  });

  return { mutaiton };
};

export default useApprovement;
