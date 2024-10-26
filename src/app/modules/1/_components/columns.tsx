"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentModel } from "@/models/document";

export const columns: ColumnDef<DocumentModel>[] = [
  {
    accessorKey: "categoryName",
    header: "Kategori",
  },
  {
    accessorKey: "subCategoryName",
    header: "Alt Kategori",
  },
  {
    accessorKey: "folderName",
    header: "Klasör Adı",
  },
  {
    accessorKey: "fileName",
    header: "Dosya Adı",
  },
];
