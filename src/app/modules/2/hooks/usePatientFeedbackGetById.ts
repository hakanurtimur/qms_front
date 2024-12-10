import patientFeedbackService from "@/services/modules/2/PatientFeedbackService";
import { useMutation } from "@tanstack/react-query";

interface PatientFeedbackGetByIdProps {
  userId: string;
  protocolId: string;
  identityNumber: string;
  key: string[];
}

const usePatientFeedbackGetById = ({
  userId,
  protocolId,
  identityNumber,
  key,
}: PatientFeedbackGetByIdProps) => {
  const getPatientFeedbackById = useMutation({
    mutationKey: key,
    mutationFn: () =>
      patientFeedbackService.getPatientById(userId, protocolId, identityNumber),
  });

  return getPatientFeedbackById;
};

export default usePatientFeedbackGetById;
