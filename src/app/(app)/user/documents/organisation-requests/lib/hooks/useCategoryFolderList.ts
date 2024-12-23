import { UserCategoryFolderListModelResponse } from "@/models/user/documents/documents/requestDocument";
import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useMutation } from "@tanstack/react-query";

const useCategoryFolderList = (
  onSuccess: (data: UserCategoryFolderListModelResponse) => void,
  onError: () => void,
) => {
  const getCategoryFolderList = useMutation({
    mutationKey: ["documents-folder-list-category"],
    mutationFn: (categoryId: number) =>
      waitingRequestsService.getCategoryFolderList(categoryId),
    onSuccess: onSuccess,
    onError: onError,
  });
  return getCategoryFolderList;
};

export default useCategoryFolderList;
