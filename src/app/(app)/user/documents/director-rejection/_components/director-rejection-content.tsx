"use client";
import React from "react";

import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/(app)/user/documents/director-rejection/_components/data-table";
import { columns } from "@/app/(app)/user/documents/director-rejection/_components/columns";
import useUserGetRejectionRequests from "@/app/(app)/user/documents/director-rejection/lib/hooks/useUserGetRejectionRequests";
import { useAuth } from "@/context/authContext";
import useUserGetActiveRejectionRequests from "@/app/(app)/user/documents/director-rejection/lib/hooks/useUserGetActiveRejectionRequests";
import useApprovement from "@/app/(app)/user/documents/director-rejection/lib/hooks/useApprovement";
import { toast } from "@/hooks/use-toast";
import LoadingText from "@/components/ui/loading-text";

const DirectorRejectionContent = () => {
  const { user } = useAuth();
  const allRequestsQuery = useUserGetRejectionRequests(
    user?.userId ?? "",
    user?.roleId ?? "",
  );
  const activeRequestsQuery = useUserGetActiveRejectionRequests(
    user?.userId ?? "",
    user?.roleId ?? "",
  );

  const deparments = allRequestsQuery?.data?.data?.map(
    (doc) => doc.departmentName,
  );

  const documentTypes = allRequestsQuery?.data?.data?.map(
    (doc) => doc.documentTypeName,
  );
  const requestTypes = allRequestsQuery?.data?.data?.map(
    (doc) => doc.requestTypeName,
  );

  const approveRequestMutation = useApprovement(
    user?.userId ?? "",
    () => {
      toast({
        title: "Başarılı",
        description: "İşlem başarılı",
        variant: "success",
      });
    },
    () => {
      toast({
        title: "Hata",
        description: "İşlem başarısız",
        variant: "destructive",
      });
    },
  );

  const handleApproveRequest = async (id: string, action_id: number) => {
    approveRequestMutation.mutate({ id, action_id });
    await allRequestsQuery.refetch();
    await activeRequestsQuery.refetch();
  };

  const departmentOps = deparments
    ? convertStringArrayToOptions(deparments)
    : null;

  const documentTypeOpts = documentTypes
    ? convertStringArrayToOptions(documentTypes)
    : null;

  const requestTypeOpts = requestTypes
    ? convertStringArrayToOptions(requestTypes)
    : null;

  const activeDeparments = activeRequestsQuery.data?.data.map(
    (doc) => doc.departmentName,
  );

  const activeDocumentTypes = activeRequestsQuery.data?.data.map(
    (doc) => doc.documentTypeName,
  );
  const activeRequestTypes = activeRequestsQuery.data?.data.map(
    (doc) => doc.requestTypeName,
  );

  const activeDepartmentOps = activeDeparments
    ? convertStringArrayToOptions(activeDeparments)
    : null;

  const activeDocumentTypeOpts = activeDocumentTypes
    ? convertStringArrayToOptions(activeDocumentTypes)
    : null;

  const activeRequestTypeOpts = activeRequestTypes
    ? convertStringArrayToOptions(activeRequestTypes)
    : null;

  return (
    <>
      <Tabs defaultValue="all">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="all">Tüm Talepler</TabsTrigger>
            <TabsTrigger value="actives">Sonuç Bekleyen Talepler</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          className="animate-in pt-2 slide-in-from-bottom-16 duration-500"
          value={"all"}
        >
          {allRequestsQuery.data &&
          departmentOps &&
          documentTypeOpts &&
          requestTypeOpts ? (
            <DataTable
              departmentOps={departmentOps}
              documentTypeOpts={documentTypeOpts}
              requestTypeOpts={requestTypeOpts}
              columns={columns}
              data={allRequestsQuery.data.data}
              variant={"default"}
              onApproveRequest={handleApproveRequest}
            />
          ) : (
            <LoadingText />
          )}
        </TabsContent>
        <TabsContent
          className="animate-in pt-2 slide-in-from-bottom-16 duration-500"
          value={"actives"}
        >
          {activeRequestsQuery.data &&
          activeDepartmentOps &&
          activeDocumentTypeOpts &&
          activeRequestTypeOpts ? (
            <DataTable
              departmentOps={activeDepartmentOps}
              documentTypeOpts={activeDocumentTypeOpts}
              requestTypeOpts={activeRequestTypeOpts}
              columns={columns}
              data={activeRequestsQuery.data.data}
              variant={"actives"}
              onApproveRequest={handleApproveRequest}
            />
          ) : (
            <LoadingText />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DirectorRejectionContent;
