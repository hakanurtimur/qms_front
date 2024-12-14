"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { PatientFeedback } from "@/models/user/patient-feedback/my-notifications/my-notifications";

export const columns: ColumnDef<PatientFeedback>[] = [
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
    accessorKey: "bildiriTuru",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildiri Türü"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildiri Türü",
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
    accessorKey: "atananBolum",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Atanan Bölüm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Atanan Bölüm",
  },
  {
    accessorKey: "bildiriTarihi",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bildiri Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Bildiri Tarihi",
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
