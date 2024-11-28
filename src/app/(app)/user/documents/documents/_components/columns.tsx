"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { EyeIcon } from "@heroicons/react/24/outline";

export const columns: ColumnDef<RequestDocumentListModel>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          Kategori
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:text-black-950 hover:scale-125 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "folderName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          Klasör Adı
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:text-black-950 hover:scale-125 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          Dosya Adı
        </div>
      );
    },
  },
];
