"use client";
import React, { useState } from "react";

import LoadingScreen from "@/components/commons/LoadingScreen";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/(app)/user/documents/waiting-requests/_components/data-table";
import { columns } from "@/app/(app)/user/documents/waiting-requests/_components/columns";
import { ResultedDataTable } from "@/app/(app)/user/documents/waiting-requests/_components/resulted/resulted-data-table";
import { resultedColumns } from "@/app/(app)/user/documents/waiting-requests/_components/resulted/resulted-columns";
import { useMutation, useQuery } from "@tanstack/react-query";
import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useAuth } from "@/context/authContext";
import requestDocumentService from "@/services/user/documents/RequestDocuments";
import PdfViewer from "@/components/ui/pdf-viewer";

const Page = () => {
  // TODO: add query service

  const { user } = useAuth();

  const [show, setShow] = useState(false);
  const [showFile, setShowFile] = useState(false);

  const allRequestsQuery = useQuery({
    queryKey: ["waiting-requests"],
    queryFn: () =>
      waitingRequestsService.list(user?.userId ?? "", user?.roleId ?? ""),
  });

  const superAdminActionListQuery = useQuery({
    queryKey: ["superAdminActionList"],
    queryFn: async () => waitingRequestsService.getSuperAdminActionList(),
  });

  const superAdminActionOpts = superAdminActionListQuery.data
    ? superAdminActionListQuery.data?.data.reduce(
        (acc, item) => {
          acc[item.superAdminActionId] = item.superAdminActionName;
          return acc;
        },
        {} as { [key: number]: string },
      )
    : ({} as { [key: number]: string });

  const superAdminAboutListQuery = useQuery({
    queryKey: ["superAdminAboutList"],
    queryFn: async () => waitingRequestsService.getSuperAdminAboutList(),
  });

  const superAdminAboutOpts = superAdminAboutListQuery.data
    ? superAdminAboutListQuery.data?.data.reduce(
        (acc, item) => {
          acc[item.superAdminAboutId] = item.superAdminAboutName;
          return acc;
        },
        {} as { [key: number]: string },
      )
    : ({} as { [key: number]: string });

  const activeRequestsQuery = useQuery({
    queryKey: ["active-waiting-requests"],
    queryFn: () =>
      waitingRequestsService.listActives(
        user?.userId ?? "",
        user?.roleId ?? "",
      ),
  });

  const documentTypeListQuery = useQuery({
    queryKey: ["documentTypeList"],
    queryFn: async () => requestDocumentService.getDocumentTypes(),
  });

  const documentTypeListQpts = documentTypeListQuery.data
    ? documentTypeListQuery.data?.data.reduce(
        (acc, item) => {
          acc[item.documentTypeId] = item.documentTypeName;
          return acc;
        },
        {} as { [key: number]: string },
      )
    : ({} as { [key: number]: string });

  const resultedRequestsQuery = {
    data: {
      data: [
        {
          Id: 101,
          AdministratorActionId: true,
          RequestTypeId: 1,
        },
        {
          Id: 102,
          AdministratorActionId: false,
          RequestTypeId: 2,
        },
      ],
    },
  };

  const deparments = allRequestsQuery.data?.data.map(
    (doc) => doc.departmentName,
  );

  const documentTypes = allRequestsQuery.data?.data.map(
    (doc) => doc.documentTypeName,
  );
  const requestTypes = allRequestsQuery.data?.data.map(
    (doc) => doc.requestTypeName,
  );

  const departmentOps = deparments
    ? convertStringArrayToOptions(deparments)
    : null;

  const documentTypeOpts = documentTypes
    ? convertStringArrayToOptions(documentTypes)
    : null;

  const requestTypeOpts = requestTypes
    ? convertStringArrayToOptions(requestTypes)
    : null;

  const getGarbage = useMutation({
    mutationKey: ["get-garbage"],
    mutationFn: (garbageId: string) =>
      requestDocumentService.getGarbage(garbageId, user?.userId ?? ""),
    onSuccess: (data) => {
      console.log(data);
      const regex = /\.(xls|xlsx|csv)$/i;
      const fileUrl = data.data.garbageURL;
      console.log(fileUrl);
      if (fileUrl && regex.test(fileUrl)) {
        window.open(fileUrl);
        return;
      }
      setShow(true);
    },
  });
  const getFile = useMutation({
    mutationKey: ["get-file"],
    mutationFn: (fileId: string) => requestDocumentService.get(fileId),
    onSuccess: (data) => {
      console.log(data);
      const regex = /\.(xls|xlsx|csv)$/i;
      const fileUrl = data.data.url;
      console.log(fileUrl);
      if (fileUrl && regex.test(fileUrl)) {
        window.open(fileUrl);
        return;
      }
      setShowFile(true);
    },
  });

  const handleGetGarbage = (fileId: string) => {
    getGarbage.mutate(fileId);
  };

  const handleGetFile = (fileId: string) => {
    getFile.mutate(fileId);
  };

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

  // const resultedRequestTypes = resultedRequestsQuery.data?.data.map(
  //   (doc) => doc.RequestTypeId,
  // );
  return (
    <div className="w-full flex flex-col space-y-10">
      <Tabs defaultValue="all">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-3 w-[720px]">
            <TabsTrigger value="all">Tüm Talepler</TabsTrigger>
            <TabsTrigger value="actives">Aktif Talepler</TabsTrigger>
            <TabsTrigger value="result">Sonuç Bekleyen Talepler</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={"all"}>
          {allRequestsQuery.data &&
          departmentOps &&
          documentTypeOpts &&
          superAdminActionListQuery &&
          superAdminAboutListQuery &&
          requestTypeOpts ? (
            <DataTable
              departmentOps={departmentOps}
              documentTypeOpts={documentTypeOpts}
              requestTypeOpts={requestTypeOpts}
              columns={columns}
              data={allRequestsQuery.data.data}
              superAdminActionOpts={superAdminActionOpts}
              superAdminAboutOpts={superAdminAboutOpts}
              handleGetGarbage={handleGetGarbage}
              handleGetFile={handleGetFile}
            />
          ) : (
            <LoadingScreen />
          )}
        </TabsContent>
        <TabsContent value={"actives"}>
          {activeRequestsQuery.data &&
          activeDepartmentOps &&
          activeDocumentTypeOpts &&
          documentTypeListQuery.data &&
          activeRequestTypeOpts ? (
            <DataTable
              departmentOps={activeDepartmentOps}
              documentTypeOpts={activeDocumentTypeOpts}
              requestTypeOpts={activeRequestTypeOpts}
              columns={columns}
              data={activeRequestsQuery.data.data}
              variant={"actives"}
              superAdminActionOpts={superAdminActionOpts}
              superAdminAboutOpts={superAdminAboutOpts}
              handleGetGarbage={handleGetGarbage}
              handleGetFile={handleGetFile}
              documentTypeListQpts={documentTypeListQpts}
            />
          ) : (
            <LoadingScreen />
          )}
        </TabsContent>
        <TabsContent value={"result"}>
          {resultedRequestsQuery.data ? (
            <ResultedDataTable
              columns={resultedColumns}
              data={resultedRequestsQuery.data.data}
            />
          ) : (
            <LoadingScreen />
          )}
        </TabsContent>
      </Tabs>
      {getGarbage.data && (
        <PdfViewer
          variant={"view"}
          open={show}
          onOpenChange={() => setShow(false)}
          fileName={getGarbage.data.data.fileName ?? null}
          src={getGarbage.data.data.garbageURL ?? ""}
        />
      )}
      {getFile.data && (
        <PdfViewer
          variant={"view"}
          open={showFile}
          onOpenChange={() => setShowFile(false)}
          fileName={getFile.data.data.fileName ?? null}
          src={getFile.data.data.url ?? ""}
        />
      )}
    </div>
  );
};

export default Page;
