import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useQuery } from "@tanstack/react-query";

interface CategoryFolderList {
  key: string[];
}

const useCategoryFolderList = ({ key }: CategoryFolderList = { key: [] }) => {
  const getCategoryFolderList = useQuery({
    queryKey: key,
    queryFn: () => waitingRequestsService.getCategoryFolderList(),
  });
  return getCategoryFolderList?.data?.data;
};

export default useCategoryFolderList;
