import { useMutation } from "@tanstack/react-query";
import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { ResultedRequestsFormModel } from "@/models/user/documents/waitingRequests/resultedRequestsFormModel";
import { toast } from "@/hooks/use-toast";

interface DocumentReviseParams {
  userId: string;
  id: string;
  body: ResultedRequestsFormModel;
  key: string[];
}

const useDocumentRevise = ({ userId, id, body, key }: DocumentReviseParams) => {
  const reviseDocument = useMutation({
    mutationKey: key,
    mutationFn: () => waitingRequestsService.revizeDocument(userId, id, body),
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Doküman başarıyla revize edildi",
        variant: "success",
      });
      window.location.reload();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Doküman revize edilirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });
  return reviseDocument;
};

export default useDocumentRevise;
