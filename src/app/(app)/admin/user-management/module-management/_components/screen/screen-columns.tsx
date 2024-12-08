"use client";

import { ColumnDef } from "@tanstack/react-table";
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
    footer: "Tip Adı",
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
    footer: "Modül Adı",
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
    footer: "Alt Modül Adı",
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
    footer: "Rol Adı",
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
    footer: "Durum",
  },
];
