import documentsGeneralService from "@/services/user/documents/document-master/DocumentMasterService";
import { useMutation } from "@tanstack/react-query";
import { DocumentMasterHistoryModelRequest } from "@/models/user/documents/document-master/DocumentMasterModels";
import { toast } from "@/hooks/use-toast";

interface DocumentHistoryUpdateDetailsProps {
  id: string;
  data: DocumentMasterHistoryModelRequest;
  keys: string[];
}

const useDocumentHistoryUpdateDetails = ({
  id,
  data,
  keys,
}: DocumentHistoryUpdateDetailsProps) => {
  const updateDocumentHistoryDetails = useMutation({
    mutationKey: keys,
    mutationFn: () =>
      documentsGeneralService.updateDocumentMasterHistoryDetail(id, data),
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Doküman geçmişi başarıyla güncellendi",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Doküman geçmişi güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  return updateDocumentHistoryDetails;
};

export default useDocumentHistoryUpdateDetails;
