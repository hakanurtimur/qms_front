import patientSafetyFeedbackService from "@/services/modules/3/PatientSafetyFeedbackService";
import { useQuery } from "@tanstack/react-query";
import { EventSceneListResponseModel } from "@/models/modules/3/PatientSafetyFeedbackModels";

interface EventSceneTypeListProps {
  key: string[];
}

const useEventSceneTypeList = ({ key }: EventSceneTypeListProps) => {
  const getEventSceneTypeList = useQuery<EventSceneListResponseModel>({
    queryKey: key,
    queryFn: () => patientSafetyFeedbackService.getEventSceneList(),
  });

  return getEventSceneTypeList;
};

export default useEventSceneTypeList;
