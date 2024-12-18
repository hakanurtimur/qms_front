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
import { Input } from "@/components/ui/input";
import NonFormCombobox from "@/components/ui/nonform-combobox"; // Import NonFormCombobox
import GeneralSheet from "./general-report/general-report-sheet";
import PatientSheet from "./patient-report/patient-report-sheet";
import { generalSheetDummyData } from "@/models/user/patient-safety-notification/sheet-model/patient-security-general-sheet-model";
import { dummyPatientSecuritySheetData } from "@/models/user/patient-safety-notification/sheet-model/patient-security-sheet-model";

interface DataTableProps<TData extends { reportType: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant: "all" | "actives";
}

export function DataTable<TData extends { reportType: string }, TValue>({
  columns,
  data,
  variant,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
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
    <div className="w-full overflow-scroll flex items-center justify-center no-scrollbar">
      <div className="rounded-md border w-full max-w-[1600px] min-w-[800px] no-scrollbar">
        <div className="flex items-center py-4 px-4 gap-10 no-scrollbar">
          <div className="flex flex-1 flex-shrink-0 items-center gap-4">
            <div className="flex-shrink-0 w-48">
              <NonFormCombobox
                value={
                  (table.getColumn("status")?.getFilterValue() as string) || ""
                }
                onChange={(value) =>
                  table.getColumn("status")?.setFilterValue(value ? value : "")
                }
                placeholder={"Durum"}
                options={{
                  "1": "Durum 1",
                  "2": "Durum 2",
                }}
              />
            </div>
            <div className="flex-shrink-0 w-64">
              <NonFormCombobox
                value={
                  (table.getColumn("reportType")?.getFilterValue() as string) ||
                  ""
                }
                onChange={(value) =>
                  table
                    .getColumn("reportType")
                    ?.setFilterValue(value ? value : "")
                }
                placeholder={"Bildirim Tipi"}
                options={{
                  Genel: "General",
                  Hasta: "Patient",
                }}
              />
            </div>
            <div className="flex-shrink-0 w-72">
              <NonFormCombobox
                value={
                  (table
                    .getColumn("eventLocation")
                    ?.getFilterValue() as string) || ""
                }
                onChange={(value) =>
                  table
                    .getColumn("eventLocation")
                    ?.setFilterValue(value ? value.toLocaleUpperCase("tr") : "")
                }
                options={{
                  "1": "Olay Yeri 1",
                  "2": "Olay Yeri 2",
                }}
                placeholder={"Olay Yeri"}
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

        {/* Table Section */}
        <div className="rounded-md border px-4 py-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <TableHead key={header.id + index}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
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
                      {variant === "all" ? (
                        row.original.reportType === "Genel" ? (
                          <GeneralSheet model={generalSheetDummyData} />
                        ) : (
                          <PatientSheet model={dummyPatientSecuritySheetData} />
                        )
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

        {/* Pagination Section */}
        <div>
          <DataTablePagination isColumnHiderDropdownVisible table={table} />
        </div>
      </div>
    </div>
  );
}
