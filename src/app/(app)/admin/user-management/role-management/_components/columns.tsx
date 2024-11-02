"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RoleManagementRoleModel } from "@/models/admin/roleManagementRoleModel";

export const columns: ColumnDef<RoleManagementRoleModel>[] = [
  {
    accessorKey: "roleName",
    header: "Rol Adı",
  },
  {
    accessorKey: "state",
    header: "Durum",
  },
];
