import { useQuery } from "@tanstack/react-query";
import archiveDocumentService from "@/services/user/documents/archive/ArchiveDocumentService";

export const useUserGetArchiveDocuments = () => {
  return useQuery({
    queryKey: ["archive-docuements"],
    queryFn: archiveDocumentService.list,
  });
};
