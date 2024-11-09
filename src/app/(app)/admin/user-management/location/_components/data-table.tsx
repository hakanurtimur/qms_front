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
        <div className="flex items-center py-4 px-4 justify-between gap-10 w-full">
          <div className="flex-grow-0 flex-shrink">
            <Input
              name="locationName"
              placeholder="Şube Adı"
              value={
                table.getColumn("locationName")?.getFilterValue() as string
              }
              onChange={(event) =>
                table
                  .getColumn("locationName")
                  ?.setFilterValue(
                    event.target.value
                      ? event.target.value.toLocaleUpperCase("tr")
                      : "",
                  )
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label>Durum</Label>
            <Select
              value={
                table.getColumn("state")?.getFilterValue() === true
                  ? "aktif"
                  : table.getColumn("state")?.getFilterValue() === false
                    ? "pasif"
                    : "hepsi"
              }
              onValueChange={(value) => {
                table
                  .getColumn("state")
                  ?.setFilterValue(
                    value === "aktif"
                      ? true
                      : value === "pasif"
                        ? false
                        : undefined,
                  );
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Durum seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"aktif"}>Aktif</SelectItem>
                <SelectItem value={"pasif"}>Pasif</SelectItem>
                <SelectItem value={"hepsi"}>Hepsi</SelectItem>
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
