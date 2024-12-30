"use client";
import { usePathname } from "next/navigation";
import documentService from "@/services/DocumentService";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/app/modules/1/_components/data-table";
import { columns } from "@/app/modules/1/_components/columns";
import { convertStringArrayToOptions } from "@/utils/convertStringArrayToOptions";
import { DocumentFolderListModel } from "@/models/document";
import useNonLoginGetDocumentCategoryList from "./lib/hooks/useNonLoginGetDocumentCategoryList";
import useNonLoginGetDocumentFolderList from "./lib/hooks/useNonLoginGetDocumentFolderList";

const Page = () => {
  const pathname = usePathname();
  const moduleId = pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(true);
  const [folderOpts, setFolderOpts] = React.useState<{ [key: string]: string }>(
    {},
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 1 saniye sonra yükleme tamamlanır
    }, 1500);

    return () => clearTimeout(timer); // Temizlik işlemi
  }, []);

  const query = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentService.getDocuments(moduleId),
  });

  const documentsCategoryListQuery = useNonLoginGetDocumentCategoryList();

  const documentsFolderListQuery = useNonLoginGetDocumentFolderList();

  const categories = documentsCategoryListQuery.data
    ? documentsCategoryListQuery.data.data
        .filter((doc) => [4, 9].includes(doc.categoryId))
        .map((doc) => doc.categoryName)
    : [];

  const handleChangeCategory = (name: string) => {
    if (!name) {
      setFolderOpts({});
      return;
    }
    const selectedCategory = documentsCategoryListQuery.data?.data.find(
      (doc) => doc.categoryName === name,
    );
    const categoryId = selectedCategory ? selectedCategory.categoryId : null;

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

  const categroyOpts = categories
    ? convertStringArrayToOptions(categories)
    : null;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center w-full h-screen">Yükleniyor...</div>
      ) : query.data && categroyOpts ? (
        <DataTable
          categoryOpts={categroyOpts}
          folderOpts={folderOpts}
          columns={columns}
          data={query.data.data}
          onChangedCategoryName={handleChangeCategory}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          Veri yüklenemedi.
        </div>
      )}
    </>
  );
};

export default Page;
