"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { ResultedRequestsModel } from "@/models/user/waitingRequests/resultedRequestsModel";

export const resultedColumns: ColumnDef<ResultedRequestsModel>[] = [
  {
    accessorKey: "Id",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "AdministratorActionId",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Yönetici Durumu"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "RequestTypeId",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep Tipi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
];
