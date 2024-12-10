import { toast } from "@/hooks/use-toast";
import { PatientFeedbackInsertRequestModel } from "@/models/modules/2/PatientFeedbackModels";
import patientFeedbackService from "@/services/modules/2/PatientFeedbackService";
import { useMutation } from "@tanstack/react-query";

interface FeedBackInsertProps {
  key: string[];
  data: PatientFeedbackInsertRequestModel;
}

const useFeedbackInsert = ({ key, data }: FeedBackInsertProps) => {
  const insertFeedback = useMutation({
    mutationKey: key,
    mutationFn: () => patientFeedbackService.insertFeedback(data),
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Geri bildiriminiz başarıyla kaydedildi",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Geri bildiriminiz kaydedilirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  return insertFeedback;
};

export default useFeedbackInsert;
