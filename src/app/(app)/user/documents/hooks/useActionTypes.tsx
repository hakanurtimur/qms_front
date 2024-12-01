"use client";

import { useQuery } from "@tanstack/react-query";
import documentsGeneralService from "@/services/user/documents/DocumentsGeneralService";

const useActionTypes = (role_id: string) => {
  const { data } = useQuery({
    queryKey: ["actionTypes"],
    queryFn: async () => documentsGeneralService.getActionTypes(role_id),
  });

  const actionTypeOpts: { [key: number]: string } | undefined =
    data &&
    data?.data.reduce(
      (acc, item) => {
        acc[item.actionId] = item.actionName;
        return acc;
      },
      {} as { [key: number]: string },
    );

  return { actionTypeOpts, data };
};

export default useActionTypes;
