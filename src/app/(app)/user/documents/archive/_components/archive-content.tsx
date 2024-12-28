"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import PdfViewer from "@/components/ui/pdf-viewer";
import { columns } from "@/app/(app)/user/documents/archive/_components/columns";
import ArchiveDocTable from "@/app/(app)/user/documents/archive/_components/archive-doc-table";
import useGetFile from "@/app/(app)/user/documents/hooks/useGetFile";
import { useUserGetArchiveDocuments } from "../lib/hooks/useUserGetArchiveDocuments";
import LoadingText from "@/components/ui/loading-text";
import useNonLoginGetDocumentCategoryList from "@/app/modules/1/lib/hooks/useNonLoginGetDocumentCategoryList";
import useNonLoginGetDocumentFolderList from "@/app/modules/1/lib/hooks/useNonLoginGetDocumentFolderList";
import { convertStringArrayToOptions } from "@/utils/convertStringArrayToOptions";
import { DocumentFolderListModel } from "@/models/document";

const ArchiveContent = () => {
  const [show, setShow] = React.useState(false);

  const documentsCategoryListQuery = useNonLoginGetDocumentCategoryList();

  const documentsFolderListQuery = useNonLoginGetDocumentFolderList();

  const [folderOpts, setFolderOpts] = React.useState<{ [key: string]: string }>(
    {},
  );

  const categories = documentsCategoryListQuery.data
    ? documentsCategoryListQuery.data.data.map((doc) => doc.categoryName)
    : [];

  const categroyOpts = categories
    ? convertStringArrayToOptions(categories)
    : null;

  const archiveQuery = useUserGetArchiveDocuments();

  const { fileUrl, fileName, getFileMutation } = useGetFile({
    handleShow: () => setShow(true),
    key: ["getDocUrl"],
  });

  const handleViewDocument = (fileId: string) => {
    getFileMutation.mutate(fileId);
    setShow(true);
  };

  const handleEditDocument = (fileId: string) => {
    getFileMutation.mutate(fileId, {
      onSuccess: () => {
        setShow(false);
      },
    });
  };

  const handleChangeCategory = (name: string) => {
    if (!name) {
      setFolderOpts({});
      return;
    }
    const selectedCategory = documentsCategoryListQuery.data?.data.find(
      (doc) => doc.categoryName === name,
    );
    const categoryId = selectedCategory ? selectedCategory.categoryId : null;
    console.log("Selected Category ID:", categoryId);

    if (categoryId !== null) {
      documentsFolderListQuery.mutate(categoryId, {
        onSuccess: (data) => {
          const newFolderOpts = data.data.reduce(
            (
              acc: { [key: string]: string },
              folder: DocumentFolderListModel,
            ) => {
              acc[folder.folderName] = folder.folderName;
              return acc;
            },
            {},
          );
          setFolderOpts(newFolderOpts);
        },
      });
    }
  };

  return (
    <>
      {archiveQuery.data ? (
        <>
          <div className="w-fit flex flex-col space-y-10">
            <Button variant="primary" onClick={() => window.location.reload()}>
              Listele
            </Button>
          </div>
          <div className="w-full flex flex-col space-y-10">
            <ArchiveDocTable
              data={archiveQuery.data.data || []}
              handleEditDocument={handleEditDocument}
              columns={columns}
              handleViewDocument={handleViewDocument}
              handleChangeCategory={handleChangeCategory}
              categoryOpts={categroyOpts}
              folderOpts={folderOpts}
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
      ) : (
        <LoadingText />
      )}
    </>
  );
};

export default ArchiveContent;
