import documentService from "@/services/DocumentService";
import { useQuery } from "@tanstack/react-query";

const useNonLoginGetDocumentCategoryList = () => {
  const query = useQuery({
    queryKey: ["documentsCategoryList"],
    queryFn: () => documentService.getDocumentCategories(),
  });

  return query;
};

export default useNonLoginGetDocumentCategoryList;
