import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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
import { Input } from "@/components/ui/input";
import ManagerSheet from "@/app/(app)/admin/user-management/employee-management/_components/manager/manager-sheet";
import DepartmentSheet from "@/app/(app)/admin/user-management/employee-management/_components/manager/department-sheet";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant: "employee" | "manager";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  variant,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="min-w-full overflow-scroll flex items-center justify-center no-scrollbar">
      <div className="min-w-full rounded-md border no-scrollbar">
        <div className="flex items-center py-4 px-4 gap-10">
          <Input
            placeholder="DETAYLI ARAMA"
            value={globalFilter ?? ""}
            onChange={(event) =>
              setGlobalFilter(event.target.value.toLocaleUpperCase("tr"))
            }
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
                  <TableHead className="w-28">İşlem</TableHead>
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
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id + index}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      {variant === "employee" ? (
                        <EmployeeSheet
                          model={
                            row.original as unknown as EmployeeToManageTableModel
                          }
                        />
                      ) : variant === "manager" ? (
                        <div className="flex gap-2">
                          <ManagerSheet
                            model={
                              row.original as unknown as EmployeeToManageTableModel
                            }
                          />
                          <DepartmentSheet
                            model={
                              row.original as unknown as EmployeeToManageTableModel
                            }
                          />
                        </div>
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
          <DataTablePagination isColumnHiderDropdownVisible table={table} />
        </div>
      </div>
    </div>
  );
}
