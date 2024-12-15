import { useMutation } from "@tanstack/react-query";
import archiveDocumentService from "@/services/user/documents/archive/ArchiveDocumentService";

export const useUserUpdateArchiveDocuments = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["update-archive-doc-state"],
    mutationFn: (data: { userId: number; fileId: number; state: boolean }) =>
      archiveDocumentService.updateDocumentArchive(data),
    onSuccess,
    onError,
  });
};
