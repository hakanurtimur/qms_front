"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";

export type Directorate = {
  id: string;
  departmentName: string;
  email: string;
};
/*
Bölüm adı
mail adresi
işlem butonu
*/

export const columns: ColumnDef<Directorate>[] = [
  {
    accessorKey: "departmentName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bölüm Adı"}
          onClick={() =>
            column.toggleSorting(
              String(column.getIsSorted()).toUpperCase() === "asc",
            )
          }
        />
      );
    },
    footer: "Bölüm Adı",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Mail Adresi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Mail Adresi",
  },
];
