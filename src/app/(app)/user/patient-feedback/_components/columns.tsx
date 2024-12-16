"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";

import { PatientFeedbackModel } from "@/models/user/patient-feedback/my-notifications/my-notifications";

export const columns: ColumnDef<PatientFeedbackModel>[] = [
  {
    accessorKey: "reportId",
    header: ({ column }) => (
      <SortingBtn
        text={"Bildirim No"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    footer: "Bildirim No",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortingBtn
        text={"Durum"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    footer: "Durum",
  },
  {
    accessorKey: "reportType",
    header: ({ column }) => (
      <SortingBtn
        text={"Bildirim Türü"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    footer: "Bildirim Türü",
  },
  {
    accessorKey: "reporterName",
    header: ({ column }) => (
      <SortingBtn
        text={"Bildirimi Yapan kişi"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    footer: "Bildirimi Yapan kişi",
  },
  {
    accessorKey: "assignedDepartment",
    header: ({ column }) => (
      <SortingBtn
        text={"Atanan Bölüm"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    footer: "Atanan Bölüm",
  },
  {
    accessorKey: "reportDate",
    header: ({ column }) => (
      <SortingBtn
        text={"Bildirim Tarihi"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    footer: "Bildirim Tarihi",
  },
  {
    accessorKey: "completionDate",
    header: ({ column }) => (
      <SortingBtn
        text={"Sonlanma Tarihi"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    footer: "Sonlanma Tarihi",
  },
];
