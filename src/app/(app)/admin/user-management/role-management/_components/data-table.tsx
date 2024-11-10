"use client";

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
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import RoleSheet from "@/app/(app)/admin/user-management/role-management/_components/sheet";
import { RoleManagementRoleModel } from "@/models/admin/roleManagementRoleModel";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSheetFormSubmit: (data: RoleManagementRoleModel) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSheetFormSubmit,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full overflow-scroll flex items-center justify-start no-scrollbar">
      <div className="rounded-md border w-full min-w-[800px] no-scrollbar">
        <div className="rounded-md border px-4 py-4 no-scrollbar">
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
                        cell.id.includes("state") ? (
                          <TableCell key={cell.id + index}>
                            {cell.getValue() === true ? "AKTİF" : "PASİF"}
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
                      <RoleSheet
                        model={
                          row.original as unknown as RoleManagementRoleModel
                        }
                        onSubmit={(data) => onSheetFormSubmit(data)}
                      />
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
