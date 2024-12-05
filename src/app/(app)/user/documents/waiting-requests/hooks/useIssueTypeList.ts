import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useQuery } from "@tanstack/react-query";

interface IssueTypeList {
  key: string[];
}

const useIssueTypeList = ({ key }: IssueTypeList = { key: [] }) => {
  const getIssueTypeList = useQuery({
    queryKey: key,
    queryFn: () => waitingRequestsService.getIssueTypeList(),
  });
  return getIssueTypeList?.data?.data;
};

export default useIssueTypeList;
