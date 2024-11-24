"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserRequestModel } from "@/models/user/documents/userRequests/userRequestModel";
import SortingBtn from "@/components/ui/sorting-btn";
import { formatDateWithoutTime } from "@/utils/dateUtils";

export const columns: ColumnDef<UserRequestModel>[] = [
  {
    accessorKey: "requestNo",
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
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Durum"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return cell.getValue() ? "AKTİF" : "PASİF";
    },
  },
  {
    accessorKey: "qualityState",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Kalite Durum"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return cell.getValue() ? "AKTİF" : "PASİF";
    },
  },
  {
    accessorKey: "managerState",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Yönetici Durum"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return cell.getValue() ? "AKTİF" : "PASİF";
    },
  },
  {
    accessorKey: "requestDate",
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
  },
  {
    accessorKey: "requester",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep Eden"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bölüm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "documentType",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Doküman Tipi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "requestType",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep Tipi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
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
  },
];
