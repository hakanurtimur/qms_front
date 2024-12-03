"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RoleManagementRoleModel } from "@/models/admin/roleManagementRoleModel";
import SortingBtn from "@/components/ui/sorting-btn";

export const columns: ColumnDef<RoleManagementRoleModel>[] = [
  {
    accessorKey: "roleName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Rol Adı"}
          onClick={() =>
            column.toggleSorting(column.getIsSorted().toUpperCase() === "asc")
          }
        />
      );
    },
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
      return cell.getValue() ? "AKTIF" : "PASIF";
    },
  },
];
