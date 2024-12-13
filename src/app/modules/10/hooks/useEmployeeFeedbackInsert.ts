import { toast } from "@/hooks/use-toast";
import { EmployeeFeedbackInsertRequestModel } from "@/models/modules/10/EmployeeFeedbackModels";
import employeeFeedbackService from "@/services/modules/10/EmployeeFeedbackService";
import { useMutation } from "@tanstack/react-query";

interface Props {
  keys: string[];
  data: EmployeeFeedbackInsertRequestModel;
  userId?: number;
}

const useEmployeeFeedbackInsert = ({ keys, data, userId }: Props) => {
  const insertEmployeeFeedbackMutation = useMutation({
    mutationKey: keys,
    mutationFn: async () =>
      employeeFeedbackService.insertEmployeeFeedback(data, userId),
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Geri bildiriminiz başarıyla gönderildi",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Geri bildiriminiz gönderilirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });
  return insertEmployeeFeedbackMutation;
};

export default useEmployeeFeedbackInsert;
