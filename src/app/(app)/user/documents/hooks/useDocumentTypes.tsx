"use client";

import { useQuery } from "@tanstack/react-query";
import documentsGeneralService from "@/services/user/documents/DocumentsGeneralService";

const useDocumentTypes = () => {
  const { data } = useQuery({
    queryKey: ["documentTypes"],
    queryFn: async () => documentsGeneralService.getDocumentTypes(),
  });

  const documentTypeOpts: { [key: number]: string } | undefined =
    data &&
    data?.data.reduce(
      (acc, item) => {
        acc[item.documentTypeId] = item.documentTypeName;
        return acc;
      },
      {} as { [key: number]: string },
    );

  return { documentTypeOpts, data };
};

export default useDocumentTypes;
