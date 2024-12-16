"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";

import { MyNotifications } from "@/models/user/patient-safety-notification/my-notifications/my-notifications";

export const columns: ColumnDef<MyNotifications>[] = [
  {
    accessorKey: "reportId",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildirim No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildirim No",
  },
  {
    accessorKey: "status",
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
    accessorKey: "reportType",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildirim Tipi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildirim Tipi",
  },
  {
    accessorKey: "reporterName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildirim Yapan Kişi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildirim Yapan Kişi",
  },
  {
    accessorKey: "protocolId",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Protokol No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Protokol No",
  },
  {
    accessorKey: "eventLocation",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Olay Yeri"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Olay Yeri",
  },
  {
    accessorKey: "eventDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Olay Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Olay Tarihi",
  },
  {
    accessorKey: "completionDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Sonlanma Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Sonlanma Tarihi",
  },
];
