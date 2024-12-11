import { toast } from "@/hooks/use-toast";
import { PatientSafetyFeedbackInsertRequestModel } from "@/models/modules/3/PatientSafetyFeedbackModels";
import patientSafetyFeedbackService from "@/services/modules/3/PatientSafetyFeedbackService";
import { useMutation } from "@tanstack/react-query";

interface PatientSafetyGeneralFeedBackInsertProps {
  key: string[];
  data: PatientSafetyFeedbackInsertRequestModel;
  userId?: string;
}

const usePatientSafetyGeneralFeedBackInsert = ({
  key,
  data,
  userId,
}: PatientSafetyGeneralFeedBackInsertProps) => {
  const insertPatientSafetyFeedback = useMutation({
    mutationKey: key,
    mutationFn: () =>
      patientSafetyFeedbackService.insertPatientSafetyFeedback(data, userId),

    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Geri bildiriminiz başarıyla gönderildi",
        variant: "success",
      });
    },
  });

  return insertPatientSafetyFeedback;
};

export default usePatientSafetyGeneralFeedBackInsert;
