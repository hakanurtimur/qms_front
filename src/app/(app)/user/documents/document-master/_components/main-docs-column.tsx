"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { DocumentMasterMainModal } from "@/models/user/documents/document-master/DocumentMasterModels";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<DocumentMasterMainModal>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Sıra No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return (
        <Badge variant={"defaultRounded"}>{cell.getValue() as string}</Badge>
      );
    },
    footer: "Sıra No",
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
    accessorKey: "documentTypeName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Doküman Tipi Adı"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Doküman Tipi Adı",
  },
  {
    accessorKey: "fileName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Dosya Adı"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-32 truncate">
                {cell.getValue() as string}
              </div>
            </TooltipTrigger>
            <TooltipContent>{cell.getValue() as string}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    footer: "Dosya Adı",
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Dosya Kodu"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Dosya Kodu",
  },
  {
    accessorKey: "lastReviseNo",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Revize No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return (
        <Badge variant={"defaultRounded"}>{cell.getValue() as string}</Badge>
      );
    },
    footer: "Revize No",
  },
  {
    accessorKey: "lastReviseDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Revize Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Revize Tarihi",
  },
  {
    accessorKey: "publishDate",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Yayın Tarihi"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Yayın Tarihi",
  },
];
