"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ManagerLocationModel } from "@/models/admin/location";
import { Button } from "@/components/ui/button";
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
    header: () => {
      return (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent p-0"
        >
          Durum
        </Button>
      );
    },
  },
];
