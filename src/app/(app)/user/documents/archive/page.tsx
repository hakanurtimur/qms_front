"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import ArchiveDocTable from "./_components/archive-doc-table";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import archiveDocumentService from "@/services/user/documents/archive/ArchiveDocumentService";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import requestDocumentService from "@/services/user/documents/request-document/RequestDocumentsService";
import { columns } from "./_components/columns";
import ArchiveDocSheet from "./_components/archive-doc-sheet";
import { useAuth } from "@/context/authContext";
import PdfViewer from "@/components/ui/pdf-viewer";

const ArchivePage = () => {
  const [documents, setDocuments] = useState<RequestDocumentListModel[]>([]);
  const [openArchiveDocSheet, setOpenArchiveDocSheet] = React.useState(false);
  const [show, setShow] = useState(false);
  const auth = useAuth();

  // Query Hook
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["documents"],
    queryFn: archiveDocumentService.list,
  });

  // State Mutation
  const stateMutation = useMutation({
    mutationKey: ["update-archive-doc-state"],
    mutationFn: (data: { userId: number; fileId: number; state: boolean }) =>
      archiveDocumentService.updateDocumentArchive(data),
    onSuccess: () => {
      refetch(); // Listeyi yenile
    },
  });

  // Data değiştiğinde documents state'ini güncelle
  useEffect(() => {
    if (data?.data) {
      setDocuments(data.data);
    }
  }, [data]);

  const getMutation = useMutation({
    mutationKey: ["goDocUrl"],
    mutationFn: (fileId: string) => requestDocumentService.get(fileId),
    onSuccess: (data) => {
      console.log(data);
      const regex = /\.(xls|xlsx|csv)$/i;
      const fileUrl = data.data.url;
      if (fileUrl && regex.test(fileUrl)) {
        console.log("WORKS1");
        window.open(fileUrl);
        return;
      }
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  const handleViewDocument = (fileId: string) => {
    getMutation.mutate(fileId);
    setShow(true);
  };

  const handleEditDocument = (fileId: string) => {
    getMutation.mutate(fileId);
    setOpenArchiveDocSheet(true);
  };

  const handleSubmitArchiveSheet = (state: boolean, fileId: number) => {
    stateMutation.mutate({
      userId: Number(auth.user?.userId),
      fileId: fileId,
      state: state,
    });
    setOpenArchiveDocSheet(false);
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="w-fit flex flex-col space-y-10">
        <Button variant="primary" onClick={() => window.location.reload()}>
          Listele
        </Button>
      </div>
      <div className="w-full flex flex-col space-y-10">
        {isSuccess && (
          <ArchiveDocTable
            handleEditDocument={handleEditDocument}
            data={documents}
            columns={columns}
            handleViewDocument={handleViewDocument}
          />
        )}
      </div>
      <PdfViewer
        open={show}
        onOpenChange={() => setShow(false)}
        fileName={getMutation.data?.data.fileName ?? null}
        src={getMutation.data?.data.url ?? ""}
        variant={"view"}
      />
      <ArchiveDocSheet
        data={getMutation.data?.data as RequestDocumentListModel}
        isOpen={openArchiveDocSheet}
        setIsOpen={setOpenArchiveDocSheet}
        handleSubmit={handleSubmitArchiveSheet}
      />
    </div>
  );
};

export default ArchivePage;
Tabs;
