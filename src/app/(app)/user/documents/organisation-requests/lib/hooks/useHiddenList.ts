import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useQuery } from "@tanstack/react-query";

interface HiddenList {
  key: string[];
}

const useHiddenList = ({ key }: HiddenList = { key: [] }) => {
  const getHiddenList = useQuery({
    queryKey: key,
    queryFn: () => waitingRequestsService.getHiddenTypeList(),
  });
  return getHiddenList?.data?.data;
};

export default useHiddenList;
