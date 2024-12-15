"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PdfViewer from "@/components/ui/pdf-viewer";
import { columns } from "@/app/(app)/user/documents/archive/_components/columns";
import ArchiveDocTable from "@/app/(app)/user/documents/archive/_components/archive-doc-table";
import useGetFile from "@/app/(app)/user/documents/hooks/useGetFile";

const ArchiveContent = () => {
  const [show, setShow] = useState(false);

  const handleShowFile = () => setShow(true);

  const { fileUrl, fileName, getFileMutation } = useGetFile({
    handleShow: handleShowFile,
    key: ["getDocUrl"],
  });

  const handleViewDocument = (fileId: string) => {
    getFileMutation.mutate(fileId);
    setShow(true);
  };

  const handleEditDocument = (fileId: string) => {
    getFileMutation.mutate(fileId);
  };

  return (
    <>
      <div className="w-fit flex flex-col space-y-10">
        <Button variant="primary" onClick={() => window.location.reload()}>
          Listele
        </Button>
      </div>
      <div className="w-full flex flex-col space-y-10">
        <ArchiveDocTable
          handleEditDocument={handleEditDocument}
          columns={columns}
          handleViewDocument={handleViewDocument}
        />
      </div>
      <PdfViewer
        open={show}
        onOpenChange={() => setShow(false)}
        fileName={fileName ?? null}
        src={fileUrl ?? ""}
        variant={"view"}
      />
    </>
  );
};

export default ArchiveContent;
