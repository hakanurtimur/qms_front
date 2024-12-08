"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";

export const columns: ColumnDef<RequestDocumentListModel>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Kategori
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:text-black-950 hover:scale-125 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    footer: "Kategori",
  },
  {
    accessorKey: "folderName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Klasör Adı
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:text-black-950 hover:scale-125 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    footer: "Klasör Adı",
  },
  {
    accessorKey: "fileName",
    header: () => {
      return <div className="flex items-center gap-1">Dosya Adı</div>;
    },
    footer: "Dosya Adı",
  },
];
