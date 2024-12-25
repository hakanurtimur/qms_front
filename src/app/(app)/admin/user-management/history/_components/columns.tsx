"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionHistoryModel } from "@/models/admin/actionHistory";
import SortingBtn from "@/components/ui/sorting-btn";

export const columns: ColumnDef<ActionHistoryModel>[] = [
  {
    accessorKey: "nameSurname",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Ad Soyad"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Ad Soyad",
  },
  {
    accessorKey: "updateTable",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"İşlem Yeri"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return [cell.getValue() as string].toString().toLocaleUpperCase("tr");
    },
    footer: "İşlem Yeri",
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"İşlem Açıklaması"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "İşlem Açıklaması",
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"İşlem Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return (
        <div className="flex items-center justify-end">
          {cell.getValue() as string}
        </div>
      );
    },
    footer: "İşlem Tarihi",
  },
];
