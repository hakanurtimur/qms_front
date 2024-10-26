"use client";

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
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { formatDate } from "@/utils/dateUtils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="w-full overflow-scroll flex items-center justify-center">
      <div className="rounded-md border w-full max-w-[1600px] min-w-[800px]">
        <div className="flex items-center py-4 px-4 gap-10 w-full justify-between">
          <div className="flex items-center gap-10">
            <div className="w-64">
              <Input
                name="nameSurname"
                placeholder="Ad Soyad"
                value={
                  table.getColumn("nameSurname")?.getFilterValue() as string
                }
                onChange={(event) =>
                  table
                    .getColumn("nameSurname")
                    ?.setFilterValue(
                      event.target.value
                        ? event.target.value.toLocaleUpperCase("tr")
                        : "",
                    )
                }
              />
            </div>
            <div className={"w-64"}>
              <Input
                name="updateTable"
                placeholder="İşlem Yeri"
                value={
                  table.getColumn("updateTable")?.getFilterValue() as string
                }
                onChange={(event) =>
                  table
                    .getColumn("updateTable")
                    ?.setFilterValue(
                      event.target.value
                        ? event.target.value.toLocaleUpperCase("tr")
                        : "",
                    )
                }
              />
            </div>
          </div>
          <div className={"w-64"}>
            <Input
              name="description"
              placeholder="Detaylı Arama"
              value={table.getColumn("description")?.getFilterValue() as string}
              onChange={(event) =>
                table
                  .getColumn("description")
                  ?.setFilterValue(
                    event.target.value
                      ? event.target.value.toLocaleUpperCase("tr")
                      : "",
                  )
              }
            />
          </div>
        </div>
        <div className="rounded-md border px-4 py-4">
          <Table className="table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    if (header.id.includes("createDate")) {
                      return (
                        <TableHead
                          className="flex items-center justify-end"
                          key={header.id + index}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    }
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
                    {row.getVisibleCells().map((cell, index) =>
                      cell.id.includes("createDate") ? (
                        <TableCell
                          className="flex items-center justify-end"
                          key={cell.id + index}
                        >
                          {formatDate(cell.getValue() as string)}
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
