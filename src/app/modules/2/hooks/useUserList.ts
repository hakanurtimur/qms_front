import patientFeedbackService from "@/services/modules/2/PatientFeedbackService";
import { useQuery } from "@tanstack/react-query";

interface UserListProps {
  key: string[];
}

const useUserList = ({ key }: UserListProps = { key: [] }) => {
  const getUserList = useQuery({
    queryKey: key,
    queryFn: () => patientFeedbackService.getUsers(),
  });

  return getUserList;
};

export default useUserList;
