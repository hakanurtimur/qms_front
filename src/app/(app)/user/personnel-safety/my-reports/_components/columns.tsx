"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";

import { EmployeeSafetyNotifications } from "@/models/user/employee-safety-notification/my-notifications/my-notifications";

export const columns: ColumnDef<EmployeeSafetyNotifications>[] = [
  {
    accessorKey: "bildiriNo",
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
    accessorKey: "bildiriYapanKisi",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildirim Yapan Kişi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildirim Yapan kişi",
  },
  {
    accessorKey: "calisanAdi",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Çalışan"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Çalışan",
  },
  {
    accessorKey: "olaydanEtkilenen",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Olaydan Etkilenen"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Olaydan Etkilenen",
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
