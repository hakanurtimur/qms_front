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
import { TooltipProvider } from "@/components/ui/tooltip";
import ModuleUpdateSheet from "./moduleSheet/module-update-sheet";
import { ModuleToManageModel } from "@/models/admin/moduleManagement/moduleToManageModel";
import NonFormCombobox from "@/components/ui/nonform-combobox";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  moduleNameOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ModuleDataTable<TData, TValue>({
  moduleNameOpts,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // TODO: add related mutation

  // const mutation = useMutation({
  //   mutationKey: ["goDoc"],
  //   mutationFn: (fileId: string) => documentService.goDoc(fileId),
  //   onSuccess: (data) => {
  //     console.log(data);
  //     console.log(data.data.url);
  //     if (data.data.url) {
  //       window.open(data.data.url, "_blank");
  //     }
  //   },
  // });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
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
    <TooltipProvider>
      <div className="w-full overflow-scroll flex items-center justify-center no-scrollbar">
        <div className="rounded-md border no-scrollbar">
          <div className="flex items-center py-4 px-4 gap-10 justify-between">
            <NonFormCombobox
              width={"w-1/2 max-w-sm"}
              placeholder="Modül Adı"
              value={
                (table.getColumn("moduleName")?.getFilterValue() as string) ||
                ""
              }
              onChange={(value) =>
                table
                  .getColumn("moduleName")
                  ?.setFilterValue(value ? value : "")
              }
              options={moduleNameOpts}
            />
            <Input
              placeholder="DETAYLI ARAMA"
              value={globalFilter ?? ""}
              onChange={(event) =>
                setGlobalFilter(event.target.value.toLocaleUpperCase("tr"))
              }
              className="max-w-sm"
            />
            {/*TODO: add input */}
            {/*<Input*/}
            {/*  placeholder="Arama yapın..."*/}
            {/*  value={globalFilter ?? ""}*/}
            {/*  onChange={(event) =>*/}
            {/*    setGlobalFilter(event.target.value.toLocaleUpperCase("tr"))*/}
            {/*  }*/}
            {/*  className="max-w-sm"*/}
            {/*/>*/}
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
                        <ModuleUpdateSheet
                          model={row.original as ModuleToManageModel}
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
    </TooltipProvider>
  );
}
