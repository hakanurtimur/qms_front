"use client";

import React, { useState } from "react";
import MainDocTable from "./main-doc-table";
import { Button } from "@/components/ui/button";
import {
  DocumentMasterHistoryModel,
  DocumentMasterHistoryModelRequest,
  DocumentMasterMainSheetModal,
  DocumentMasterMainSheetModelRequest,
} from "@/models/user/documents/document-master/DocumentMasterModels";
import MainDocSheet from "./main-doc-sheet";
import DocumentMasterHistoryModal from "./history-modal";
import HistorySheet from "./history-sheet";
import useDocumentMainList from "./../libs/hooks/useDocumentMainList";
import useDocumentGetById from "./../libs/hooks/useDocumentGetById";
import useIssueTypeList from "../../organisation-requests/lib/hooks/useIssueTypeList";
import { RequestDocumentCreatedModel } from "@/models/user/documents/documents/requestDocumentCreate";
import useDocumentUpdateHistory from "./../libs/hooks/useDocumentUpdateHistory";
import useDocumentHistoryList from "./../libs/hooks/useDocumenHistoryList";
import useDocumentHistoryGetById from "./../libs/hooks/useDocumentHistoryGetById";
import useDocumentHistoryUpdateDetails from "./../libs/hooks/useDocumentHistoryUpdateDetails";

export default function DocumentMasterContentPage() {
  const [isOpenMainDocSheet, setOpenMainDocSheet] = useState<boolean>(false);
  const [isOpenHistoryModal, setOpenHistoryModal] = useState<boolean>(false);
  const [isOpenHistorySheet, setOpenHistorySheet] = useState<boolean>(false);
  const [updatedDocHistoryData, setUpdatedDocHistoryData] = useState<
    unknown | null
  >(null);
  const [selectedRowInMainTable, setSelectedRowInMainTable] =
    useState<string>("");
  const [selectedRowCodeInHistoryTable, setSelectedRowCodeInHistoryTable] =
    useState<string>("");
  const [selectedRowIdInHistoryTable, setSelectedRowIdInHistoryTable] =
    useState<string>("");

  const [updateDocHistoryDetailsData, setUpdateDocHistoryDetailsData] =
    useState<unknown | null>(null);

  const mainDocs = useDocumentMainList({
    key: ["document-master-main-list"],
  });

  const mainDoc = useDocumentGetById({
    key: ["document-master-main-get-by-id"],
    id: selectedRowInMainTable ?? "",
  });

  const issueTypeList = useIssueTypeList({
    key: ["issue-type-list-for-document-master"],
  });

  const updateDocHistory = useDocumentUpdateHistory({
    key: ["document-master-update-history"],
    id: selectedRowInMainTable ?? "",
    data:
      (updatedDocHistoryData as unknown as DocumentMasterMainSheetModelRequest) ??
      {},
  });

  const documentHistoryListMutation = useDocumentHistoryList({
    key: ["document-master-history-list"],
    code: selectedRowCodeInHistoryTable ?? "",
  });

  const getDocumentHistoryByIdMutation = useDocumentHistoryGetById({
    key: ["document-master-history-get-by-id"],
    id: selectedRowIdInHistoryTable ?? "",
  });

  const updateDocumentHistoryDetailsMutation = useDocumentHistoryUpdateDetails({
    keys: ["document-master-history-update-details-request"],
    id: selectedRowIdInHistoryTable ?? "",
    data:
      (updateDocHistoryDetailsData as DocumentMasterHistoryModelRequest) ?? {},
  });

  const handleOpenMainDocSheet = (id: string) => {
    setSelectedRowInMainTable(id);
    setOpenMainDocSheet(true);
    mainDoc.mutateAsync();
  };

  const handleHistoryButton = (code: string) => {
    setSelectedRowCodeInHistoryTable(code);
    documentHistoryListMutation.mutate();
    setOpenHistoryModal(true);
  };

  const handleHistoryTableSelectedRow = (id: string) => {
    setSelectedRowIdInHistoryTable(id);
    getDocumentHistoryByIdMutation.mutate();
    setOpenHistorySheet(true);
  };

  const handleSubmitMainDocSheet = (
    data: DocumentMasterMainSheetModelRequest,
  ) => {
    const newData: DocumentMasterMainSheetModelRequest = {
      ...data,
    };
    setUpdatedDocHistoryData(newData);
    updateDocHistory.mutate();
    setOpenMainDocSheet(false);
    mainDocs.refetch();
  };

  const handleSubmitHistoryDocSheet = (
    data: DocumentMasterHistoryModelRequest,
  ) => {
    setUpdateDocHistoryDetailsData(data);
    updateDocumentHistoryDetailsMutation.mutate();
    setOpenHistorySheet(false);
    documentHistoryListMutation.mutate();
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="w-32">
          <Button className="mb-4">Listele</Button>
        </div>
        <MainDocTable
          data={mainDocs?.data?.data || []}
          handleOpenMainDocSheet={handleOpenMainDocSheet}
        />
      </div>
      {mainDoc.isSuccess && (
        <MainDocSheet
          isOpen={isOpenMainDocSheet}
          setIsOpen={setOpenMainDocSheet}
          data={(mainDoc?.data?.data as DocumentMasterMainSheetModal) || {}}
          handleHistoryButton={handleHistoryButton}
          handleSubmit={handleSubmitMainDocSheet}
          rowId={selectedRowInMainTable}
          issueTypeList={
            (issueTypeList as unknown as RequestDocumentCreatedModel[]) || []
          }
        />
      )}
      {documentHistoryListMutation.isSuccess && (
        <DocumentMasterHistoryModal
          open={isOpenHistoryModal}
          setOpen={setOpenHistoryModal}
          historyTableData={documentHistoryListMutation.data?.data || []}
          handleSelectedRow={handleHistoryTableSelectedRow}
        />
      )}
      {getDocumentHistoryByIdMutation.isSuccess && (
        <HistorySheet
          isOpen={isOpenHistorySheet}
          setIsOpen={setOpenHistorySheet}
          setSubmitData={handleSubmitHistoryDocSheet}
          data={
            (getDocumentHistoryByIdMutation.data
              ?.data as unknown as DocumentMasterHistoryModel) || {}
          }
        />
      )}
    </div>
  );
}
