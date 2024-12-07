"use client";
import React from "react";

import LoadingScreen from "@/components/commons/LoadingScreen";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/(app)/user/documents/director-rejection/_components/data-table";
import { columns } from "@/app/(app)/user/documents/director-rejection/_components/columns";
import useListRequests from "@/app/(app)/user/documents/director-rejection/lib/hooks/useListRequests";
import { useAuth } from "@/context/authContext";
import useActiveListRequests from "@/app/(app)/user/documents/director-rejection/lib/hooks/useActiveListRequests";
import useApprovement from "@/app/(app)/user/documents/director-rejection/lib/hooks/useApprovement";

const Page = () => {
  const { user } = useAuth();
  const { query: allRequestsQuery } = useListRequests(
    user?.userId ?? "",
    user?.roleId ?? "",
  );
  const { query: activeRequestsQuery } = useActiveListRequests(
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

  const { mutaiton: approveRequestMutation } = useApprovement(
    user?.userId ?? "",
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
    <div className="w-full flex flex-col space-y-10">
      <Tabs defaultValue="all">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="all">Tüm Talepler</TabsTrigger>
            <TabsTrigger value="actives">Aktif Talepler</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={"all"}>
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
            <LoadingScreen />
          )}
        </TabsContent>
        <TabsContent value={"actives"}>
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
            <LoadingScreen />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
