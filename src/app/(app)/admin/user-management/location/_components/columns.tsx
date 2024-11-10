"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ManagerLocationModel } from "@/models/admin/location";
import SortingBtn from "@/components/ui/sorting-btn";

export const columns: ColumnDef<ManagerLocationModel>[] = [
  {
    accessorKey: "countryName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Ülke"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "cityName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Şehir"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "locationName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Şube Adı"}
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
];
