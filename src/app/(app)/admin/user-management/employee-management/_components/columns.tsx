"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EmployeeToManageTableModel } from "@/models/admin/employeeManagement/employeeToManageTableModel";

export const Columns: ColumnDef<EmployeeToManageTableModel>[] = [
  {
    accessorKey: "nameSurname",
    header: "Ad-Soyad",
  },
  {
    accessorKey: "departmentName",
    header: "Bölüm",
  },
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "jobName",
    header: "Görev",
  },
  {
    accessorKey: "roleName",
    header: "Rol",
  },
  {
    accessorKey: "workingStatus",
    header: "Durum",
  },
];
