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
import NonFormCombobox from "@/components/ui/nonform-combobox";
import { Input } from "@/components/ui/input";
import MyAllReportsSheet from "./all-my-reports/my-reports-sheet";
import EmployeeSafetyMyDutiesSheet from "./my-assigned-duties/my-duties-sheet";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant?: "all" | "actives";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  variant,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
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
    onGlobalFilterChange: setGlobalFilter,
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
      globalFilter,
    },
  });

  return (
    <div className="min-w-full overflow-scroll flex items-center justify-center no-scrollbar">
      <div className="min-w-full rounded-md border no-scrollbar">
        <div className="flex items-center py-4 px-4 gap-10">
          <div className="flex flex-1 flex-shrink-0 items-center gap-4">
            <div className="flex-shrink-0 w-48">
              <NonFormCombobox
                value={
                  (table.getColumn("durum")?.getFilterValue() as string) || ""
                }
                onChange={(value) =>
                  table.getColumn("durum")?.setFilterValue(value ? value : "")
                }
                placeholder={"Durum"}
                options={{
                  "1": "Tip 1",
                  "2": "Tip 2",
                }}
              />
            </div>
            <div className="flex-shrink-0 w-72">
              <NonFormCombobox
                value={
                  (table.getColumn("olayYeri")?.getFilterValue() as string) ||
                  ""
                }
                onChange={(value) =>
                  table
                    .getColumn("olayYeri")
                    ?.setFilterValue(value ? value.toLocaleUpperCase("tr") : "")
                }
                placeholder={"Olay Yeri"}
                options={{
                  "1": "Yer 1",
                  "2": "Yer 2",
                }}
              />
            </div>
          </div>
          <div className="flex flex-1 max-w-[520px] flex-shrink-0 col-span-1 justify-end gap-2">
            <Input
              placeholder="Arama yapın..."
              value={globalFilter ?? ""}
              onChange={(event) =>
                setGlobalFilter(event.target.value.toLocaleUpperCase("tr"))
              }
              className="max-w-sm"
            />
          </div>
        </div>
        <div className="rounded-md border px-4 py-4">
          <Table className="">
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
                  <TableHead className="w-20">İşlem</TableHead>
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
                      {variant === "all" ? <MyAllReportsSheet /> : null}
                      {variant === "actives" ? (
                        <EmployeeSafetyMyDutiesSheet />
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
