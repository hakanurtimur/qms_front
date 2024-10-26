"use client";
import { usePathname } from "next/navigation";
import documentService from "@/services/DocumentService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "@/app/modules/1/_components/data-table";
import { columns } from "@/app/modules/1/_components/columns";
import LoadingScreen from "@/components/commons/LoadingScreen";

const Page = () => {
  const pathname = usePathname();
  const moduleId = pathname.split("/")[2];

  const query = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentService.getDocuments(moduleId),
  });

  return (
    <>
      {query.data ? (
        <DataTable columns={columns} data={query.data.data} />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Page;
