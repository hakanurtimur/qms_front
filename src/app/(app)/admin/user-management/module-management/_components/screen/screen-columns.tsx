"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ScreenToManageModel } from "@/models/admin/moduleManagement/screenToManageModel";
import SortingBtn from "@/components/ui/sorting-btn";

export const screenColumns: ColumnDef<ScreenToManageModel>[] = [
  {
    accessorKey: "typeName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text="Tip Adı"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "moduleName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text="Modül Adı"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "subModuleName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text="Alt Modül Adı"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "roleName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text="Rol Adı"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Durum
        </Button>
      );
    },
    cell: ({ cell }) => {
      return cell.getValue() ? "AKTİF" : "PASİF";
    },
  },
];
