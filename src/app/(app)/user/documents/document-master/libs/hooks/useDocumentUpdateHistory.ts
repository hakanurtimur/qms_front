import documentsGeneralService from "@/services/user/documents/document-master/DocumentMasterService";
import { useMutation } from "@tanstack/react-query";
import { DocumentMasterMainSheetModelRequest } from "@/models/user/documents/document-master/DocumentMasterModels";
import { toast } from "@/hooks/use-toast";

interface DocumentUpdateHistoryProps {
  key: string[];
  id: string;
  data: DocumentMasterMainSheetModelRequest;
}

const useDocumentUpdateHistory = ({
  key,
  id,
  data,
}: DocumentUpdateHistoryProps) => {
  const updateDocumentHistory = useMutation({
    mutationKey: key,
    mutationFn: () =>
      documentsGeneralService.updateDocumentMasterHistory(id, data),
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Talep başarıyla güncellendi",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Talep güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  return updateDocumentHistory;
};

export default useDocumentUpdateHistory;
