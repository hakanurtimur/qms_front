import patientSafetyFeedbackService from "@/services/modules/3/PatientSafetyFeedbackService";
import { useQuery } from "@tanstack/react-query";

interface FeedBackTypeListProps {
  key: string[];
}

const useFeedBackEventTypeList = ({ key }: FeedBackTypeListProps) => {
  const feedbackTypeList = useQuery({
    queryKey: key,
    queryFn: () => patientSafetyFeedbackService.getFeedbackEventTypeList(),
  });

  return feedbackTypeList;
};

export default useFeedBackEventTypeList;
