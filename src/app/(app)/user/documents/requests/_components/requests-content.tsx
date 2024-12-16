"use client";
import React, { useState } from "react";

import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { columns } from "@/app/(app)/user/documents/requests/_components/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/(app)/user/documents/requests/_components/data-table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import useDocumentTypes from "@/app/(app)/user/documents/hooks/useDocumentTypes";
import useActionTypes from "@/app/(app)/user/documents/hooks/useActionTypes";
import PdfViewer from "@/components/ui/pdf-viewer";
import useGetGarbage from "@/app/(app)/user/documents/hooks/useGetGarbage";
import useGetFile from "@/app/(app)/user/documents/hooks/useGetFile";
import { UpdateDocumentDemandModel } from "@/models/user/documents/userRequests/userRequestModel";
import { toast } from "@/hooks/use-toast";
import { useUserGetActiveRequests } from "./../lib/hooks/useUserGetActiveRequests";
import { useUserUpdateDocumentDemand } from "./../lib/hooks/useUserUpdateDocument";
import { useUserGetAllRequests } from "./../lib/hooks/useUserGetAllRequest";

const RequestContentPage = () => {
  const { user } = useAuth();
  const { documentTypeOpts: documentTypeListOpts } = useDocumentTypes();
  const { actionTypeOpts: actionTypeListOpts } = useActionTypes(
    user?.roleId ?? "",
  );
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { garbageSrc, garbageFileName, getGarbageMutation } = useGetGarbage({
    handleShow,
    userId: user?.userId ?? "",
  });
  const [showFile, setShowFile] = useState(false);
  const handleShowFile = () => setShowFile(true);
  const { fileUrl, fileName, getFileMutation } = useGetFile({
    handleShow: handleShowFile,
    key: ["getDocUrl"],
  });

  const allRequestsQuery = useUserGetAllRequests(
    user?.userId ?? "",
    user?.roleId ?? "",
    user?.departmentId ?? "",
  );

  const activeRequestsQuery = useUserGetActiveRequests({
    userId: user?.userId ?? "",
    roleId: user?.roleId ?? "",
    departmentId: user?.departmentId ?? "",
  });

  const updateDocumentDemandMutation = useUserUpdateDocumentDemand(
    () => {
      activeRequestsQuery.refetch();
      toast({
        title: "Başarılı",
        description: "Talep başarıyla güncellendi",
        variant: "success",
      });
    },
    () => {
      toast({
        title: "Hata",
        description: "İlgili işlemin süreci devam etmektedir.",
        variant: "destructive",
      });
    },
  );

  const handleGetGarbage = (fileId: string) => {
    getGarbageMutation.mutate(fileId);
  };
  const handleGetFile = (fileId: string) => {
    getFileMutation.mutate(fileId);
  };

  const deparments = allRequestsQuery.data?.data.map(
    (doc) => doc.departmentName ?? "",
  );

  const documentTypes = allRequestsQuery.data?.data.map(
    (doc) => doc.documentTypeName ?? "",
  );
  const requestTypes = allRequestsQuery.data?.data.map(
    (doc) => doc.requestTypeName ?? "",
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

  const activeDeparments = activeRequestsQuery.data?.data.map(
    (doc) => doc.departmentName ?? "",
  );

  const activeDocumentTypes = activeRequestsQuery.data?.data.map(
    (doc) => doc.documentTypeName ?? "",
  );
  const activeRequestTypes = activeRequestsQuery.data?.data.map(
    (doc) => doc.requestTypeName ?? "",
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

  const handleUpdateDocumentDemand = async (
    data: UpdateDocumentDemandModel,
  ) => {
    updateDocumentDemandMutation.mutate({
      userId: user?.userId ?? "",
      roleId: user?.roleId ?? "",
      data: data,
    });
    await activeRequestsQuery.refetch();
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <Button
        className="w-fit px-7"
        onClick={() => {
          window.location.reload();
        }}
      >
        Listele
      </Button>
      <Tabs defaultValue="all">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="all">Tüm Talepler</TabsTrigger>
            <TabsTrigger value="actives">Aktif Talepler</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          className="animate-in slide-in-from-bottom-16 duration-500"
          value={"all"}
        >
          {allRequestsQuery.data &&
          departmentOps &&
          documentTypeOpts &&
          documentTypeListOpts &&
          actionTypeListOpts &&
          requestTypeOpts ? (
            <DataTable
              departmentOps={departmentOps}
              documentTypeOpts={documentTypeOpts}
              requestTypeOpts={requestTypeOpts}
              documentTypeListOpts={documentTypeListOpts}
              actionTypeListOpts={actionTypeListOpts}
              columns={columns}
              data={allRequestsQuery.data.data}
              handleGetGarbage={handleGetGarbage}
              handleGetFile={handleGetFile}
              updateDocumentDemandMutation={handleUpdateDocumentDemand}
            />
          ) : null}
        </TabsContent>
        <TabsContent
          className="animate-in slide-in-from-bottom-16 duration-500"
          value={"actives"}
        >
          {activeRequestsQuery.data &&
          activeDepartmentOps &&
          activeDocumentTypeOpts &&
          documentTypeListOpts &&
          actionTypeListOpts &&
          activeRequestTypeOpts ? (
            <DataTable
              departmentOps={activeDepartmentOps}
              documentTypeOpts={activeDocumentTypeOpts}
              requestTypeOpts={activeRequestTypeOpts}
              documentTypeListOpts={documentTypeListOpts}
              actionTypeListOpts={actionTypeListOpts}
              columns={columns}
              data={activeRequestsQuery.data.data}
              variant={"actives"}
              handleGetGarbage={handleGetGarbage}
              handleGetFile={handleGetFile}
              updateDocumentDemandMutation={handleUpdateDocumentDemand}
            />
          ) : null}
        </TabsContent>
      </Tabs>
      {getGarbageMutation.data && (
        <PdfViewer
          variant={"view"}
          open={show}
          onOpenChange={() => setShow(false)}
          fileName={garbageFileName ?? null}
          src={garbageSrc ?? ""}
        />
      )}
      {getFileMutation.data && (
        <PdfViewer
          variant={"view"}
          open={showFile}
          onOpenChange={() => setShowFile(false)}
          fileName={fileName ?? null}
          src={fileUrl ?? ""}
        />
      )}
    </div>
  );
};

export default RequestContentPage;
