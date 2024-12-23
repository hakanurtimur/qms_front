import { useMutation } from "@tanstack/react-query";
import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { ResultedRequestsFormModel } from "@/models/user/documents/waitingRequests/resultedRequestsFormModel";
import { toast } from "@/hooks/use-toast";

interface DocumentCreateParams {
  userId: string;
  id: string;
  body: ResultedRequestsFormModel;
  key: string[];
}

const useDocumentCreate = ({ userId, id, body, key }: DocumentCreateParams) => {
  const createDocument = useMutation({
    mutationKey: key,
    mutationFn: () => waitingRequestsService.createDocument(userId, id, body),
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Talep başarıyla güncellendi",
        variant: "success",
      });

      //window.location.reload();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Talep güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });
  return createDocument;
};

export default useDocumentCreate;
