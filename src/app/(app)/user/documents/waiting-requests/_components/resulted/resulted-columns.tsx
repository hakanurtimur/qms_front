"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { WaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";

export const resultedColumns: ColumnDef<WaitingRequestModel>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Talep No",
  },
  {
    accessorKey: "administratorActionName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Yönetici Durumu"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Yönetici Durumu",
  },
  {
    accessorKey: "requestTypeId",
    header: () => {
      return null;
    },
    cell: () => {
      return null;
    },
    footer: "",
  },
];
