"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ModuleToManageModel } from "@/models/admin/moduleManagement/moduleToManageModel";
import SortingBtn from "@/components/ui/sorting-btn";

export const moduleColumns: ColumnDef<ModuleToManageModel>[] = [
  {
    accessorKey: "moduleName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modül Adı
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    footer: "Modül Adı",
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
