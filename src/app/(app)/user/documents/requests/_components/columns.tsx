"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserRequestModel } from "@/models/user/documents/userRequests/userRequestModel";
import SortingBtn from "@/components/ui/sorting-btn";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<UserRequestModel>[] = [
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
    cell: ({ cell }) => {
      return (
        <Badge variant={"defaultRounded"}>{cell.getValue() as string}</Badge>
      );
    },
    footer: "Talep No",
  },
  {
    accessorKey: "actionName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Durum"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Durum",
  },
  {
    accessorKey: "superAdminActionName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Kalite Durum"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Kalite Durum",
  },
  {
    accessorKey: "administratorActionName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Direktör Durum"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Direktör Durum",
  },
  {
    accessorKey: "fileName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Dosya Adı"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-24 truncate">
                {cell.getValue() as string}
              </div>
            </TooltipTrigger>
            <TooltipContent>{cell.getValue() as string}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    footer: "Dosya Adı",
  },
  {
    accessorKey: "openDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return cell.getValue() as string;
    },
    footer: "Talep Tarihi",
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
    accessorKey: "departmentName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bölüm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bölüm",
  },
  /*  {
    accessorKey: "documentTypeName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Doküman Tipi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Doküman Tipi",
  }, */
  {
    accessorKey: "requestTypeName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep Tipi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Talep Tipi",
  },
  /* {
    accessorKey: "updateDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Güncelleme Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return formatDateWithoutTime(cell.getValue() as string);
    },
    footer: "Güncelleme Tarihi",
  }, */
];
