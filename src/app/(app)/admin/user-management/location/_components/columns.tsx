"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ManagerLocationModel } from "@/models/admin/location";

export const columns: ColumnDef<ManagerLocationModel>[] = [
  {
    accessorKey: "locationName",
    header: "Şube",
  },
  {
    accessorKey: "state",
    header: "Durum",
  },
];
