"use client";
import { usePathname } from "next/navigation";
import documentService from "@/services/DocumentService";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/app/modules/1/_components/data-table";
import { columns } from "@/app/modules/1/_components/columns";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";

const Page = () => {
  const pathname = usePathname();
  const moduleId = pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(true);

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

  const categories = query.data?.data.map((doc) => doc.categoryName);

  const folderNames = query.data?.data.map((doc) => doc.folderName);

  const categroyOpts = categories
    ? convertStringArrayToOptions(categories)
    : null;
  const folderOpts = folderNames
    ? convertStringArrayToOptions(folderNames)
    : null;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center w-full h-screen">Yükleniyor...</div>
      ) : query.data && categroyOpts && folderOpts ? (
        <DataTable
          categoryOpts={categroyOpts}
          folderOpts={folderOpts}
          columns={columns}
          data={query.data.data}
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
