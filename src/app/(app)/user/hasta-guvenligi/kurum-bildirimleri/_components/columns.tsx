"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";

import { MyNotifications } from "@/models/user/patient-safety-notification/my-notifications/my-notifications";

export const columns: ColumnDef<MyNotifications>[] = [
  {
    accessorKey: "bildiriNo",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildiri No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildiri No",
  },
  {
    accessorKey: "durum",
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
    accessorKey: "bildiriTipi",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildiri Tipi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildiri Tipi",
  },
  {
    accessorKey: "bildiriYapanKisi",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildiri Yapan Kişi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildiri Yapan Kişi",
  },
  {
    accessorKey: "protokolNo",
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
    accessorKey: "olayYeri",
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
    accessorKey: "olayTarihi",
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
    accessorKey: "sonlanmaTarihi",
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
