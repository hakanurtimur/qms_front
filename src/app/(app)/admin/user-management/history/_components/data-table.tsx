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
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import NonFormCombobox from "@/components/ui/nonform-combobox";

interface DataTableProps<TData, TValue> {
  nameOpts: { [key: string]: string };
  updateTableOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  nameOpts,
  updateTableOpts,
  columns,
  data,
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
    <div className="min-w-full overflow-scroll flex items-center justify-center no-scrollbar">
      <div className="min-w-full rounded-md border no-scrollbar">
        <div className="flex items-center py-4 px-4 gap-10 w-full justify-between no-scrollbar">
          <div className="flex items-center gap-10">
            <div className="w-64">
              <NonFormCombobox
                width={"max-w-sm"}
                placeholder="ADI SOYADI"
                value={
                  (table
                    .getColumn("nameSurname")
                    ?.getFilterValue() as string) || ""
                }
                onChange={(value) =>
                  table
                    .getColumn("nameSurname")
                    ?.setFilterValue(value ? value : "")
                }
                options={nameOpts}
              />
            </div>
            <div className={"w-64"}>
              <NonFormCombobox
                width={"max-w-sm"}
                placeholder="İŞLEM YERİ"
                value={
                  (table
                    .getColumn("updateTable")
                    ?.getFilterValue() as string) || ""
                }
                onChange={(value) =>
                  table
                    .getColumn("updateTable")
                    ?.setFilterValue(value ? value : "")
                }
                options={updateTableOpts}
              />
            </div>
          </div>
          <div className={"w-64"}>
            <Input
              name="description"
              placeholder="DETAYLI ARAMA"
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
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id + index}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
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
