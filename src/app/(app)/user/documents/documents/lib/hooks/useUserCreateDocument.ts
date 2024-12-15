import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";
import requestDocumentService from "@/services/user/documents/request-document/RequestDocumentsService";
import { useMutation } from "@tanstack/react-query";

export const useUserCreateDocument = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ["createDocument"],
    mutationFn: (data: { userId: string; formData: RequestDocumentCreate }) =>
      requestDocumentService.createDocument(data),
    onSuccess: onSuccess,
  });
};
