"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { ResultedRequestsModel } from "@/models/user/documents/waitingRequests/resultedRequestsModel";
import { EyeIcon } from "lucide-react";

export const resultedColumns: ColumnDef<ResultedRequestsModel>[] = [
  {
    accessorKey: "Id",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Talep No"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "AdministratorActionId",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Yönetici Durumu"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "RequestTypeId",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Talep Tipi"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
];
