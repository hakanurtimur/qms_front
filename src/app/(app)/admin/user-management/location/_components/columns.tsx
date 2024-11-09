"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ManagerLocationModel } from "@/models/admin/location";

export const columns: ColumnDef<ManagerLocationModel>[] = [
  {
    accessorKey: "countryName",
    header: "Ülke",
  },
  {
    accessorKey: "cityName",
    header: "Şehir",
  },
  {
    accessorKey: "locationName",
    header: "Şube",
  },
  {
    accessorKey: "state",
    header: "Durum",
  },
];
