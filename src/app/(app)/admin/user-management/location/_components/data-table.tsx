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
import FormSheet from "@/app/(app)/admin/user-management/location/_components/sheet";
import { ManagerLocationModel } from "@/models/admin/location";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSheetFormSubmit: (data: ManagerLocationModel) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSheetFormSubmit,
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

  return (
    <div className="w-full overflow-scroll flex items-center justify-center no-scrollbar">
      <div className="rounded-md border w-full max-w-[1600px] min-w-[800px] no-scrollbar">
        <div className="flex items-center py-4 px-4 justify-between gap-10 w-full no-scrollbar">
          <div className="flex-grow-0 flex-shrink">
            <Input
              name="locationName"
              placeholder="Detaylı Arama"
              value={globalFilter ?? ""}
              onChange={(event) =>
                setGlobalFilter(event.target.value.toLocaleUpperCase("tr"))
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label>Durum</Label>
            <Select
              value={
                table.getColumn("state")?.getFilterValue() === true
                  ? "AKTİF"
                  : table.getColumn("state")?.getFilterValue() === false
                    ? "PASİF"
                    : "HEPSİ"
              }
              onValueChange={(value) => {
                table
                  .getColumn("state")
                  ?.setFilterValue(
                    value === "AKTİF"
                      ? true
                      : value === "PASİF"
                        ? false
                        : undefined,
                  );
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Durum seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"AKTİF"}>AKTİF</SelectItem>
                <SelectItem value={"PASİF"}>PASİF</SelectItem>
                <SelectItem value={"HEPSİ"}>HEPSİ</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                      <FormSheet
                        model={row.original as unknown as ManagerLocationModel}
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
