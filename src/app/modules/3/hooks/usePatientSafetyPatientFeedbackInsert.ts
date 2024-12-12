import { toast } from "@/hooks/use-toast";
import { PatientSafetyFeedbackPatientRequestModel } from "@/models/modules/3/PatientSafetyFeedbackModels";
import patientSafetyFeedbackService from "@/services/modules/3/PatientSafetyFeedbackService";
import { useMutation } from "@tanstack/react-query";

interface PatientSafetyPatientFeedBackInsertProps {
  key: string[];
  data: PatientSafetyFeedbackPatientRequestModel;
  userId?: string;
}

const usePatientSafetyGeneralFeedBackInsert = ({
  key,
  data,
  userId,
}: PatientSafetyPatientFeedBackInsertProps) => {
  const insertPatientSafetyPatientFeedback = useMutation({
    mutationKey: key,
    mutationFn: () =>
      patientSafetyFeedbackService.insertPatientSafetyPatientFeedback(
        data,
        userId,
      ),

    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Geri bildiriminiz başarıyla gönderildi",
        variant: "success",
      });
    },
  });

  return insertPatientSafetyPatientFeedback;
};

export default usePatientSafetyGeneralFeedBackInsert;
