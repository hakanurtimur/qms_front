"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RoleManagementRoleModel } from "@/models/admin/roleManagementRoleModel";
import { Button } from "@/components/ui/button";
import SortingBtn from "@/components/ui/sorting-btn";

export const columns: ColumnDef<RoleManagementRoleModel>[] = [
  {
    accessorKey: "roleName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Rol Adı"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "state",
    header: () => {
      return (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent p-0"
        >
          Durum
        </Button>
      );
    },
  },
];
