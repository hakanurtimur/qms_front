"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentModel } from "@/models/document";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<DocumentModel>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "folderName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Klasör Adı
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
  },
];
