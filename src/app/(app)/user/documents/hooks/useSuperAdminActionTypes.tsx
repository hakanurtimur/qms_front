"use client";

import { useQuery } from "@tanstack/react-query";
import documentsGeneralService from "@/services/user/documents/DocumentsGeneralService";

const useSuperAdminActionTypes = () => {
  const { data } = useQuery({
    queryKey: ["superAdminActionTypes"],
    queryFn: async () => documentsGeneralService.getSuperAdminActionList(),
  });

  const superAdminActionOpts: { [key: number]: string } | undefined =
    data &&
    data?.data.reduce(
      (acc, item) => {
        acc[item.superAdminActionId] = item.superAdminActionName;
        return acc;
      },
      {} as { [key: number]: string },
    );

  return { superAdminActionOpts, data };
};

export default useSuperAdminActionTypes;
