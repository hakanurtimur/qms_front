"use client";
import React, { useState } from "react";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/(app)/user/documents/waiting-requests/_components/data-table";
import { columns } from "@/app/(app)/user/documents/waiting-requests/_components/columns";
import { ResultedDataTable } from "@/app/(app)/user/documents/waiting-requests/_components/resulted/resulted-data-table";
import { resultedColumns } from "@/app/(app)/user/documents/waiting-requests/_components/resulted/resulted-columns";
import { useMutation, useQuery } from "@tanstack/react-query";
import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import { useAuth } from "@/context/authContext";
import PdfViewer from "@/components/ui/pdf-viewer";
import DocumentReviseForm from "@/app/(app)/user/documents/waiting-requests/_components/document-revise-modal";
import DocumentUploadForm from "@/app/(app)/user/documents/waiting-requests/_components/document-upload-modal";
import useDocumentTypes from "@/app/(app)/user/documents/hooks/useDocumentTypes";
import useSuperAdminActionTypes from "@/app/(app)/user/documents/hooks/useSuperAdminActionTypes";
import useSuperAdminAboutTypes from "@/app/(app)/user/documents/hooks/useSuperAdminAboutTypes";
import useGetGarbage from "@/app/(app)/user/documents/hooks/useGetGarbage";
import useGetFile from "@/app/(app)/user/documents/hooks/useGetFile";
import { UpdateWaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { toast } from "@/hooks/use-toast";
import useCategoryFolderList from "./hooks/useCategoryFolderList";
import useHiddenList from "./hooks/useHiddenList";
import useIssueTypeList from "./hooks/useIssueTypeList";
import {
  ResultedRequestsFormModel,
  ResultedRequestsReviseFormModel,
} from "@/models/user/documents/waitingRequests/resultedRequestsFormModel";
import useDocumentCreate from "./hooks/useDocumentCreate";
import useDocumentRevise from "./hooks/useDocumentRevise";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { RequestDocumentCreatedModel } from "@/models/user/documents/documents/requestDocumentCreate";

const Page = () => {
  const { user } = useAuth();
  const { documentTypeOpts: documentTypeListQpts } = useDocumentTypes();
  const { superAdminActionOpts } = useSuperAdminActionTypes();
  const { superAdminAboutOpts } = useSuperAdminAboutTypes();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [uploadData, setUploadData] =
    useState<ResultedRequestsFormModel | null>(null);
  const [reviseData, setReviseData] =
    useState<ResultedRequestsReviseFormModel | null>();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { garbageSrc, garbageFileName, getGarbageMutation } = useGetGarbage({
    handleShow,
    userId: user?.userId ?? "",
  });

  const [showFile, setShowFile] = useState(false);
  const [openDocumentUploadModal, setDocumentUploadModal] =
    React.useState(false);
  const [openDocumentReviseModal, setDocumentReviseModal] =
    React.useState(false);
  const { fileUrl, fileName, getFileMutation } = useGetFile({
    handleShow: () => setShowFile(true),
    key: ["getDocUrl"],
  });

  const categoryFolderList =
    useCategoryFolderList({
      key: ["category-folder-list"],
    }) ?? [];

  console.log("categoryFolderList", categoryFolderList);

  const hiddenTypeList =
    useHiddenList({
      key: ["hidden-type-list"],
    }) ?? [];

  const issueTypeList =
    useIssueTypeList({
      key: ["issue-type-list"],
    }) ?? [];

  const allRequestsQuery = useQuery({
    queryKey: ["waiting-requests"],
    queryFn: () =>
      waitingRequestsService.list(user?.userId ?? "", user?.roleId ?? ""),
  });

  const activeRequestsQuery = useQuery({
    queryKey: ["active-waiting-requests"],
    queryFn: () =>
      waitingRequestsService.listActives(
        user?.userId ?? "",
        user?.roleId ?? "",
      ),
  });

  const resultedRequestsQuery = useQuery({
    queryKey: ["resulted-requests"],
    queryFn: () =>
      waitingRequestsService.getResultedRequests(
        user?.userId ?? "",
        user?.roleId ?? "",
      ),
  });

  const updateWaitingRequestMutation = useMutation({
    mutationKey: ["update-waiting-request"],
    mutationFn: (data: UpdateWaitingRequestModel) =>
      waitingRequestsService.update(user?.userId ?? "", data),
    onSuccess: () => {
      allRequestsQuery.refetch();
      activeRequestsQuery.refetch();
      toast({
        title: "Başarılı",
        description: "Talep başarıyla güncellendi",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Talep güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const createDocument = useDocumentCreate({
    userId: user?.userId ?? "",
    id: selectedRow ?? "",
    body: uploadData ?? ({} as ResultedRequestsFormModel),
    key: ["create-document-for-waiting-request"],
  });

  const reviseDocument = useDocumentRevise({
    userId: user?.userId ?? "",
    id: selectedRow ?? "",
    body: reviseData ?? ({} as ResultedRequestsReviseFormModel),
    key: ["revise-document-for-waiting-request"],
  });

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

  const handleGetGarbage = (fileId: string) => {
    getGarbageMutation.mutate(fileId);
  };

  const handleGetFile = (fileId: string) => {
    getFileMutation.mutate(fileId);
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

  const handleOpenDocumentUploadModal = (id: string) => {
    setSelectedRow(id);
    setDocumentUploadModal(true);
  };

  const handleOpenDocumentReviseModal = (id: string) => {
    setSelectedRow(id);
    setDocumentReviseModal(true);
  };

  const handleSubmitDocumentUpload = (data: ResultedRequestsFormModel) => {
    const body = {
      ...data,
      newFileName: data.formFile?.name.split(".")[0],
      format: data.formFile?.type?.split("/")[1],
    };
    setUploadData(body);
    createDocument.mutate();
  };

  const handleSubmitDocumentRevise = (
    data: ResultedRequestsReviseFormModel,
  ) => {
    const body: ResultedRequestsReviseFormModel = {
      ...data,
      format: data.formFile?.type?.split("/")[1],
    };

    setReviseData(body);
    reviseDocument.mutate();
  };

  // const resultedRequestTypes = resultedRequestsQuery.data?.data.map(
  //   (doc) => doc.RequestTypeId,
  // );
  const handleUpdateWaitingRequest = (data: UpdateWaitingRequestModel) => {
    updateWaitingRequestMutation.mutate(data);
  };

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
          superAdminActionOpts &&
          superAdminAboutOpts &&
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
              handleUpdateWaitingRequest={handleUpdateWaitingRequest}
            />
          ) : null}
        </TabsContent>
        <TabsContent value={"actives"}>
          {activeRequestsQuery.data &&
          activeDepartmentOps &&
          activeDocumentTypeOpts &&
          superAdminActionOpts &&
          documentTypeOpts &&
          superAdminAboutOpts &&
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
              handleUpdateWaitingRequest={handleUpdateWaitingRequest}
            />
          ) : null}
        </TabsContent>
        <TabsContent value={"result"}>
          {resultedRequestsQuery.data ? (
            <ResultedDataTable
              columns={resultedColumns}
              data={resultedRequestsQuery.data.data}
              handleDocumentUploadModal={handleOpenDocumentUploadModal}
              handleDocumentReviseModal={handleOpenDocumentReviseModal}
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
      {documentTypeListQpts && (
        <>
          <DocumentUploadForm
            open={openDocumentUploadModal}
            setOpen={() => setDocumentUploadModal(!openDocumentUploadModal)}
            documentTypeListQpts={documentTypeListQpts}
            categoryFolderList={
              categoryFolderList as RequestDocumentListModel[]
            }
            hiddenTypeList={hiddenTypeList as RequestDocumentCreatedModel[]}
            issueTypeList={issueTypeList as RequestDocumentCreatedModel[]}
            onSubmit={handleSubmitDocumentUpload}
          />
          <DocumentReviseForm
            open={openDocumentReviseModal}
            setOpen={() => setDocumentReviseModal(!openDocumentReviseModal)}
            documentTypeListQpts={documentTypeListQpts}
            issueTypeList={issueTypeList as RequestDocumentCreatedModel[]}
            onSubmit={handleSubmitDocumentRevise}
          />
        </>
      )}
    </div>
  );
};

export default Page;
