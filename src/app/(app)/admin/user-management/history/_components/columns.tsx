"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionHistoryModel } from "@/models/admin/actionHistory";

export const columns: ColumnDef<ActionHistoryModel>[] = [
  {
    accessorKey: "nameSurname",
    header: "Ad Soyad",
  },
  {
    accessorKey: "updateTable",
    header: "İşlem Yeri",
  },
  {
    accessorKey: "description",
    header: "İşlem Açıklaması",
  },
  {
    accessorKey: "createDate",
    header: "İşlem Tarihi",
  },
];
