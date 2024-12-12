import patientSafetyFeedbackService from "@/services/modules/3/PatientSafetyFeedbackService";
import { useMutation } from "@tanstack/react-query";

interface PatientGetByIdProps {
  protocolId: string;
  key: string[];
}

export const usePatientGetById = ({ protocolId, key }: PatientGetByIdProps) => {
  const mutation = useMutation({
    mutationKey: key,
    mutationFn: () => patientSafetyFeedbackService.getPatientById(protocolId),
  });

  return mutation;
};

export default usePatientGetById;
