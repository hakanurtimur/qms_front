import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";
import requestDocumentService from "@/services/user/documents/request-document/RequestDocumentsService";
import { useMutation } from "@tanstack/react-query";

export const useUserUpdateDocument = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ["reviseDocument"],
    mutationFn: (data: { userId: string; formData: RequestDocumentCreate }) =>
      requestDocumentService.reviseDocument(data),
    onSuccess: onSuccess,
  });
};
