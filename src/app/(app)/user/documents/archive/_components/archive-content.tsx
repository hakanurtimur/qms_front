"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { useAuth } from "@/context/authContext";
import PdfViewer from "@/components/ui/pdf-viewer";
import { toast } from "@/hooks/use-toast";
import ArchiveDocSheet from "@/app/(app)/user/documents/archive/_components/archive-doc-sheet";
import { columns } from "@/app/(app)/user/documents/archive/_components/columns";
import ArchiveDocTable from "@/app/(app)/user/documents/archive/_components/archive-doc-table";
import { useUserGetArchiveDocuments } from "@/app/(app)/user/documents/archive/lib/hooks/useUserGetArchiveDocuments";
import { useUserUpdateArchiveDocuments } from "@/app/(app)/user/documents/archive/lib/hooks/useUserUpdateArchiveDocuments";
import useGetFile from "@/app/(app)/user/documents/hooks/useGetFile";
import LoadingText from "@/components/ui/loading-text";

const ArchiveContent = () => {
  const auth = useAuth();
  const [documents, setDocuments] = useState<RequestDocumentListModel[]>([]);
  const [openArchiveDocSheet, setOpenArchiveDocSheet] = React.useState(false);
  const [show, setShow] = useState(false);

  const handleShowFile = () => setShow(true);

  const { fileUrl, fileName, getFileMutation } = useGetFile({
    handleShow: handleShowFile,
    key: ["getDocUrl"],
  });

  const { data, isSuccess, refetch } = useUserGetArchiveDocuments();

  const updateArchiveDocumentsMutation = useUserUpdateArchiveDocuments(
    () => {
      toast({
        title: "Başarılı",
        description: "Döküman başarıyla güncellendi",
        variant: "success",
      });
      refetch().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Döküman güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  useEffect(() => {
    if (data?.data) {
      setDocuments(data.data);
    }
  }, [data]);

  const handleViewDocument = (fileId: string) => {
    getFileMutation.mutate(fileId);
    setShow(true);
  };

  const handleEditDocument = (fileId: string) => {
    getFileMutation.mutate(fileId);
    setOpenArchiveDocSheet(true);
  };

  const handleSubmitArchiveSheet = (state: boolean, fileId: number) => {
    updateArchiveDocumentsMutation.mutate({
      userId: Number(auth.user?.userId),
      fileId: fileId,
      state: state,
    });
    setOpenArchiveDocSheet(false);
  };

  return (
    <>
      <div className="w-fit flex flex-col space-y-10">
        <Button variant="primary" onClick={() => window.location.reload()}>
          Listele
        </Button>
      </div>
      <div className="w-full flex flex-col space-y-10">
        {documents ? (
          <ArchiveDocTable
            handleEditDocument={handleEditDocument}
            data={documents}
            columns={columns}
            handleViewDocument={handleViewDocument}
          />
        ) : (
          <LoadingText />
        )}
      </div>
      <PdfViewer
        open={show}
        onOpenChange={() => setShow(false)}
        fileName={fileName ?? null}
        src={fileUrl ?? ""}
        variant={"view"}
      />
      <ArchiveDocSheet
        data={getFileMutation.data?.data as RequestDocumentListModel}
        isOpen={openArchiveDocSheet}
        setIsOpen={setOpenArchiveDocSheet}
        handleSubmit={handleSubmitArchiveSheet}
      />
    </>
  );
};

export default ArchiveContent;
