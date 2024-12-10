import patientFeedbackService from "@/services/modules/2/PatientFeedbackService";
import { useQuery } from "@tanstack/react-query";

interface FeedBackTypeListProps {
  key: string[];
}

const useFeedBackTypeList = ({ key }: FeedBackTypeListProps) => {
  const feedbackTypeList = useQuery({
    queryKey: key,
    queryFn: () => patientFeedbackService.getFeedbackTypes(),
  });

  return feedbackTypeList;
};

export default useFeedBackTypeList;
