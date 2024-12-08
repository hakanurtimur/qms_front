"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentModel } from "@/models/document";
import { Button } from "@/components/ui/button";
import SortingBtn from "@/components/ui/sorting-btn";

export const columns: ColumnDef<DocumentModel>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Kategori"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Kategori",
  },
  {
    accessorKey: "folderName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Klasör Adı"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Klasör Adı",
  },
  {
    accessorKey: "fileName",
    header: () => {
      return (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent p-0"
        >
          Dosya Adı
        </Button>
      );
    },
    footer: "Dosya Adı",
  },
];
