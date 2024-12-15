/*
    const updateDocumentDemandMutation = useMutation({
    mutationKey: ["documents", "update"],
    mutationFn: (data: UpdateDocumentDemandModel) =>
      requestDocumentService.updateDocumentDemand(
        user?.userId ?? "",
        user?.roleId ?? "",
        data,
      ),
    onSuccess: async () => {
      await activeRequestsQuery.refetch();
      toast({
        title: "Başarılı",
        description: "Talep başarıyla güncellendi",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "İlgili işlemin süreci devam etmektedir.",
        variant: "destructive",
      });
    },
  });
*/

import { UpdateDocumentDemandModel } from "@/models/user/documents/userRequests/userRequestModel";
import requestDocumentService from "@/services/user/documents/request-document/RequestDocumentsService";
import { useMutation } from "@tanstack/react-query";

export const useUserUpdateDocumentDemand = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["documents", "update"],
    mutationFn: (args: {
      userId: string;
      roleId: string;
      data: UpdateDocumentDemandModel;
    }) =>
      requestDocumentService.updateDocumentDemand(
        args.userId,
        args.roleId,
        args.data,
      ),
    onSuccess: onSuccess,
    onError: onError,
  });
};
