import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import EmployeeSheet from "@/app/(app)/admin/user-management/employee-management/_components/employee/employee-sheet";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { EmployeeToManageTableModel } from "@/models/admin/employeeManagement/employeeToManageTableModel";
import { EmployeeRole } from "@/models/admin/employeeManagement/roles";
import { Input } from "@/components/ui/input";
import ManagerSheet from "@/app/(app)/admin/user-management/employee-management/_components/manager/manager-sheet";
import { EmployeeDepartment } from "@/models/admin/employeeManagement/departments";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSheetFormSubmit: (data: EmployeeToManageTableModel) => void;
  roles: EmployeeRole[];
  departments: EmployeeDepartment[] | undefined;
  variant: "employee" | "manager";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSheetFormSubmit,
  roles,
  departments,
  variant,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    },
    state: {
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="w-full overflow-scroll flex items-center justify-center">
      <div className="rounded-md border w-full max-w-[1600px] min-w-[800px]">
        <div className="flex items-center py-4 px-4 justify-between gap-10 w-full">
          <Input
            placeholder="Arama yapın..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border px-4 py-4">
          <Table className="table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead key={header.id + index}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id + index}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row
                      .getVisibleCells()
                      .map((cell, index) =>
                        cell.id.includes("workingStatus") ? (
                          <TableCell key={cell.id + index}>
                            {cell.getValue() === true ? "Aktif" : "Pasif"}
                          </TableCell>
                        ) : (
                          <TableCell key={cell.id + index}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ),
                      )}
                    <TableCell>
                      {variant === "employee" ? (
                        <EmployeeSheet
                          model={
                            row.original as unknown as EmployeeToManageTableModel
                          }
                          onSubmit={(data) => onSheetFormSubmit(data)}
                          roles={roles}
                        />
                      ) : variant === "manager" && departments ? (
                        <ManagerSheet
                          model={
                            row.original as unknown as EmployeeToManageTableModel
                          }
                          onSubmit={(data) => {
                            onSheetFormSubmit(data);
                          }}
                          roles={roles}
                          departments={departments}
                        />
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Sonuç yok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
