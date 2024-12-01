"use client";

import { useQuery } from "@tanstack/react-query";
import documentsGeneralService from "@/services/user/documents/DocumentsGeneralService";

const useSuperAdminAboutTypes = () => {
  const { data } = useQuery({
    queryKey: ["superAdminAboutTypes"],
    queryFn: async () => documentsGeneralService.getSuperAdminAboutList(),
  });

  const superAdminAboutOpts: { [key: number]: string } | undefined =
    data &&
    data?.data.reduce(
      (acc, item) => {
        acc[item.superAdminAboutId] = item.superAdminAboutName;
        return acc;
      },
      {} as { [key: number]: string },
    );

  return { superAdminAboutOpts, data };
};

export default useSuperAdminAboutTypes;
