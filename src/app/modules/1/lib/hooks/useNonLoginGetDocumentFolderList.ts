import documentService from "@/services/DocumentService";
import { useMutation } from "@tanstack/react-query";

export const useNonLoginGetDocumentFolderList = () => {
  const mutation = useMutation({
    mutationKey: ["documentsFolderList"],
    mutationFn: (categoryId: number) =>
      documentService.getDocumentFolders(categoryId),
  });

  return mutation;
};

export default useNonLoginGetDocumentFolderList;
