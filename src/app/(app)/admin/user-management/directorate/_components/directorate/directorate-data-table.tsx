"use client";

import {
  ColumnDef,
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
import { Input } from "@/components/ui/input";
import DirectorateUpdateSheet from "./directorateSheet/directorate-update-sheet";
import NonFormCombobox from "@/components/ui/nonform-combobox";

interface DirectorateModel {
  id: string;
  departmentName: string;
  email: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      globalFilter,
    },
  });

  const categories = {
    IT: "IT",
    FRONTEND: "FRONTEND DEVELOPER",
    BACKEND: "BACKEND DEVELOPER",
  };

  return (
    <div className="w-full overflow-scroll flex items-center justify-start no-scrollbar">
      <div className="rounded-md border w-full min-w-[800px] no-scrollbar">
        <div className="flex items-center py-4 px-4 justify-between gap-10 w-full no-scrollbar">
          <NonFormCombobox
            width={"w-1/2 max-w-sm"}
            value={
              (table.getColumn("departmentName")?.getFilterValue() as string) ||
              ""
            }
            onChange={(value) =>
              table
                .getColumn("departmentName")
                ?.setFilterValue(value ? value : "")
            }
            placeholder={"BÖLÜMLER"}
            options={categories}
          />
          <Input
            placeholder="DETAYLI ARAMA"
            value={globalFilter ?? ""}
            onChange={(event) =>
              setGlobalFilter(event.target.value.toLocaleUpperCase("tr"))
            }
            className="max-w-sm"
          />
        </div>
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
                      <DirectorateUpdateSheet
                        model={row.original as unknown as DirectorateModel}
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
          <DataTablePagination isColumnHiderDropdownVisible table={table} />
        </div>
      </div>
    </div>
  );
}
