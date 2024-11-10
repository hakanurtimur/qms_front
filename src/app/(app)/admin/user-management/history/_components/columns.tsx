"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionHistoryModel } from "@/models/admin/actionHistory";
import SortingBtn from "@/components/ui/sorting-btn";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateUtils";

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
  },
  {
    accessorKey: "createDate",
    header: () => {
      return (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent p-0"
        >
          İşlem Tarihi
        </Button>
      );
    },
    cell: ({ cell }) => {
      return formatDate(cell.getValue() as string);
    },
  },
];
