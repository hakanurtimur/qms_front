"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { formatDateWithoutTime } from "@/utils/dateUtils";
import { WaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<WaitingRequestModel>[] = [
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
    enableHiding: true,
    footer: "Talep No",
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
    enableHiding: true,
    footer: "Kalite Durum",
  },
  {
    accessorKey: "administratorActionName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Yönetici Durum"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    enableHiding: true,
    footer: "Yönetici Durum",
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
      return formatDateWithoutTime(cell.getValue() as string);
    },
    enableHiding: true,
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
    enableHiding: true,
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
    enableHiding: true,
    footer: "Bölüm",
  },
  {
    accessorKey: "adminName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Admin Adı"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    enableHiding: true,
    footer: "Admin Adı",
  },
  {
    accessorKey: "documentTypeName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Doküman Tipi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    enableHiding: true,
    footer: "Doküman Tipi",
  },
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
    enableHiding: true,
    footer: "Talep Tipi",
  },
  {
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
    enableHiding: true,
    footer: "Güncelleme Tarihi",
  },
];
