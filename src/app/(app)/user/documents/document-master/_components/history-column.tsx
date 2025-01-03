"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { DocumentMasterHistoryModel } from "@/models/user/documents/document-master/DocumentMasterModels";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<DocumentMasterHistoryModel>[] = [
  {
    accessorKey: "reviseNo",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Revize No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return (
        <Badge variant={"defaultRounded"}>{cell.getValue() as string}</Badge>
      );
    },
    footer: "Revize No",
  },
  {
    accessorKey: "reviseDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Revize Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Revize Tarihi",
  },
  {
    accessorKey: "publishDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Yayın Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Yayın Tarihi",
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Açıklama"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Açıklama",
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep Eden"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Talep Eden",
  },
  {
    accessorKey: "superAdminName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"KYS Sorumlusu"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "KYS Sorumlusu",
  },
  {
    accessorKey: "administratorName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Onaylayan"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Onaylayan",
  },
];
