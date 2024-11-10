"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EmployeeToManageTableModel } from "@/models/admin/employeeManagement/employeeToManageTableModel";
import SortingBtn from "@/components/ui/sorting-btn";

export const Columns: ColumnDef<EmployeeToManageTableModel>[] = [
  {
    accessorKey: "nameSurname",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Ad Soyad"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "departmentName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Bölüm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "jobName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Görev"}
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
          text={"Rol"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "workingStatus",
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
  },
];
