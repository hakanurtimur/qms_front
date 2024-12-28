"use client";
import React, { useState } from "react";
import { convertStringArrayToOptions } from "@/utils/convertStringArrayToOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/(app)/user/documents/organisation-requests/_components/data-table";
import { columns } from "@/app/(app)/user/documents/organisation-requests/_components/columns";
import { ResultedDataTable } from "@/app/(app)/user/documents/organisation-requests/_components/resulted/resulted-data-table";
import { resultedColumns } from "@/app/(app)/user/documents/organisation-requests/_components/resulted/resulted-columns";
import { useAuth } from "@/context/authContext";
import PdfViewer from "@/components/ui/pdf-viewer";
import useDocumentTypes from "@/app/(app)/user/documents/hooks/useDocumentTypes";
import useSuperAdminActionTypes from "@/app/(app)/user/documents/hooks/useSuperAdminActionTypes";
import useSuperAdminAboutTypes from "@/app/(app)/user/documents/hooks/useSuperAdminAboutTypes";
import useGetGarbage from "@/app/(app)/user/documents/hooks/useGetGarbage";
import useGetFile from "@/app/(app)/user/documents/hooks/useGetFile";
import { UpdateWaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { toast } from "@/hooks/use-toast";
import useCategoryFolderList from "../lib/hooks/useCategoryFolderList";
import useIssueTypeList from "../lib/hooks/useIssueTypeList";
import {
  ResultedRequestsFormModel,
  ResultedRequestsReviseFormModel,
} from "@/models/user/documents/waitingRequests/resultedRequestsFormModel";
import useDocumentCreate from "../lib/hooks/useDocumentCreate";
import useDocumentRevise from "../lib/hooks/useDocumentRevise";
import {
  UserCategoryFolderListModel,
  UserCategoryFolderListModelResponse,
} from "@/models/user/documents/documents/requestDocument";
import { RequestDocumentCreatedModel } from "@/models/user/documents/documents/requestDocumentCreate";
import { useUserGetAllRequests } from "../lib/hooks/useUserGetAllRequests";
import { useUserGetActiveRequests } from "../lib/hooks/useUserGetActiveRequest";
import { useUserGetResultesRequests } from "../lib/hooks/useUserGetResultesRequests";
import { useUserUpdateWaitingRequest } from "../lib/hooks/useUserUpdateWaitingRequest";
import { Button } from "@/components/ui/button";

const WaitingRequestsContentPage = () => {
  const { user } = useAuth();
  const { documentTypeOpts: documentTypeListQpts } = useDocumentTypes();
  const { superAdminActionOpts } = useSuperAdminActionTypes();
  const { superAdminAboutOpts } = useSuperAdminAboutTypes();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [categoryFolderList, setCategoryFolderList] = useState<
    UserCategoryFolderListModel[]
  >([]);
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
  const [openDocumentReviseModal, setOpenDocumentReviseModal] =
    React.useState(false);
  const { fileUrl, fileName, getFileMutation } = useGetFile({
    handleShow: () => setShowFile(true),
    key: ["getDocUrl"],
  });

  const categoryFolderListMutation = useCategoryFolderList(
    (data: UserCategoryFolderListModelResponse) => {
      console.log("Category Folder List", data);
      setCategoryFolderList(data.data);

      console.log(categoryFolderListMutation);
    },
    () => {
      toast({
        title: "Hata",
        description: "Klasörler getirilirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  const issueTypeList =
    useIssueTypeList({
      key: ["issue-type-list"],
    }) ?? [];

  const allRequestsQuery = useUserGetAllRequests(
    user?.userId ?? "",
    user?.roleId ?? "",
  );

  const activeRequestsQuery = useUserGetActiveRequests(
    user?.userId ?? "",
    user?.roleId ?? "",
  );

  const resultedRequestsQuery = useUserGetResultesRequests(
    user?.userId ?? "",
    user?.roleId ?? "",
  );

  const updateWaitingRequestMutation = useUserUpdateWaitingRequest(
    () => {
      toast({
        title: "Başarılı",
        description: "Talep başarıyla güncellendi",
        variant: "success",
      });
      allRequestsQuery.refetch().then();
      activeRequestsQuery.refetch().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Talep güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

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
  const superAdminActionNames = allRequestsQuery.data?.data.map(
    (doc) => doc.superAdminActionName,
  );
  const superAdminActionNameOpts = superAdminActionNames
    ? convertStringArrayToOptions(superAdminActionNames)
    : null;

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
  const activeSuperAdminActionNames = activeRequestsQuery.data?.data.map(
    (doc) => doc.superAdminActionName,
  );
  const activeSuperAdminActionNameOpts = activeSuperAdminActionNames
    ? convertStringArrayToOptions(activeSuperAdminActionNames)
    : null;

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
    console.log("Open Document Upload Modal", id);
    setSelectedRow(id);
    setDocumentUploadModal(!openDocumentUploadModal);
  };

  const handleOpenDocumentReviseModal = (id: string) => {
    setSelectedRow(id);
    console.log("Open Document Revise Modal", id);
    setOpenDocumentReviseModal(!openDocumentReviseModal);
  };

  const handleSubmitDocumentUpload = (data: ResultedRequestsFormModel) => {
    const body = {
      ...data,
      newFileName: data.formFile?.name.split(".")[0],
      format: data.formFile?.type?.split("/")[1],
    };
    console.log("Submit Document Upload", body);
    console.log("Selected Row", selectedRow);
    setUploadData(body);
    setDocumentUploadModal(false);
    createDocument.mutate();
  };

  const handleSubmitDocumentRevise = (
    data: ResultedRequestsReviseFormModel,
  ) => {
    const body: ResultedRequestsReviseFormModel = {
      ...data,
      format: data.formFile?.type?.split("/")[1],
    };
    console.log("Submit Document Revise", body);
    console.log("Selected Row", selectedRow);
    setReviseData(body);
    reviseDocument.mutate();
  };

  // const resultedRequestTypes = resultedRequestsQuery.data?.data.map(
  //   (doc) => doc.RequestTypeId,
  // );
  const handleUpdateWaitingRequest = (data: UpdateWaitingRequestModel) => {
    updateWaitingRequestMutation.mutate({
      data,
      userId: user?.userId ?? "",
    });
  };

  const handleDocumentTypeChange = (documentTypeId: number) => {
    categoryFolderListMutation.mutate(documentTypeId);
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Listele
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-3 w-[720px]">
            <TabsTrigger value="all">Tüm Talepler</TabsTrigger>
            <TabsTrigger value="actives">Aktif Talepler</TabsTrigger>
            <TabsTrigger value="result">Sonuç Bekleyen Talepler</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          className="animate-in pt-2 slide-in-from-bottom-16 duration-500"
          value={"all"}
        >
          {allRequestsQuery.data &&
          departmentOps &&
          documentTypeOpts &&
          superAdminActionOpts &&
          superAdminAboutOpts &&
          superAdminActionNameOpts &&
          requestTypeOpts ? (
            <DataTable
              departmentOps={departmentOps}
              documentTypeOpts={documentTypeOpts}
              requestTypeOpts={requestTypeOpts}
              columns={columns}
              data={allRequestsQuery.data.data}
              superAdminActionOpts={superAdminActionOpts}
              superAdminAboutOpts={superAdminAboutOpts}
              superAdminActionNameOpts={superAdminActionNameOpts}
              handleGetGarbage={handleGetGarbage}
              handleGetFile={handleGetFile}
              handleUpdateWaitingRequest={handleUpdateWaitingRequest}
            />
          ) : null}
        </TabsContent>
        <TabsContent
          className="animate-in pt-2 slide-in-from-bottom-16 duration-500"
          value={"actives"}
        >
          {activeRequestsQuery.data &&
          activeDepartmentOps &&
          activeDocumentTypeOpts &&
          superAdminActionOpts &&
          documentTypeOpts &&
          superAdminAboutOpts &&
          activeSuperAdminActionNameOpts &&
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
              superAdminActionNameOpts={activeSuperAdminActionNameOpts}
              handleGetGarbage={handleGetGarbage}
              handleGetFile={handleGetFile}
              documentTypeListQpts={documentTypeListQpts}
              handleUpdateWaitingRequest={handleUpdateWaitingRequest}
            />
          ) : null}
        </TabsContent>
        <TabsContent
          className="animate-in pt-2 slide-in-from-bottom-16 duration-500"
          value={"result"}
        >
          {resultedRequestsQuery.data ? (
            <ResultedDataTable
              columns={resultedColumns}
              isOpenDocumentUploadModal={openDocumentUploadModal}
              isOpenDocumentReviseModal={openDocumentReviseModal}
              data={resultedRequestsQuery.data.data}
              handleOpenDocumentUploadModal={handleOpenDocumentUploadModal}
              handleOpenDocumentReviseModal={handleOpenDocumentReviseModal}
              documentTypeListQpts={documentTypeListQpts ?? {}}
              categoryFolderList={categoryFolderList}
              issueTypeList={issueTypeList as RequestDocumentCreatedModel[]}
              onSubmitDocumentUpload={handleSubmitDocumentUpload}
              onSubmitDocumentRevise={handleSubmitDocumentRevise}
              handleDocumentTypeChange={handleDocumentTypeChange}
            />
          ) : null}
        </TabsContent>
      </Tabs>
      {getGarbageMutation.data && (
        <PdfViewer
          variant={"printible"}
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
      {documentTypeListQpts && <></>}
    </div>
  );
};

export default WaitingRequestsContentPage;
