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
import { ScreenToManageModel } from "@/models/admin/moduleManagement/screenToManageModel";
import NonFormCombobox from "@/components/ui/nonform-combobox";
import { Input } from "@/components/ui/input";
import ScreenUpdateSheet from "@/app/(app)/admin/user-management/module-management/_components/screen/screenSheet/screen-update-sheet";

interface DataTableProps<TData, TValue> {
  screenModuleOpts: { [key: string]: string };
  screenTypeOpts: { [key: string]: string };
  screenSubModuleOpts: { [key: string]: string };
  screenRoleOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ScreenDataTable<TData, TValue>({
  screenModuleOpts,
  screenTypeOpts,
  screenSubModuleOpts,
  screenRoleOpts,
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
              placeholder="Tip Adı"
              value={
                (table.getColumn("typeName")?.getFilterValue() as string) || ""
              }
              onChange={(value) =>
                table.getColumn("typeName")?.setFilterValue(value ? value : "")
              }
              options={screenTypeOpts}
            />
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
              options={screenModuleOpts}
            />
            <NonFormCombobox
              width={"w-1/2 max-w-sm"}
              placeholder="Alt Modül Adı"
              value={
                (table
                  .getColumn("subModuleName")
                  ?.getFilterValue() as string) || ""
              }
              onChange={(value) =>
                table
                  .getColumn("subModuleName")
                  ?.setFilterValue(value ? value : "")
              }
              options={screenSubModuleOpts}
            />
            <NonFormCombobox
              width={"w-1/2 max-w-sm"}
              placeholder="Rol Adı"
              value={
                (table.getColumn("roleName")?.getFilterValue() as string) || ""
              }
              onChange={(value) =>
                table.getColumn("roleName")?.setFilterValue(value ? value : "")
              }
              options={screenRoleOpts}
            />
            <Input
              placeholder="Arama yapın..."
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
                    <TableHead className="w-40">İşlem</TableHead>
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
                        <ScreenUpdateSheet
                          model={row.original as ScreenToManageModel}
                          onSubmit={(data: ScreenToManageModel) => {
                            console.log(data);
                          }}
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
    </TooltipProvider>
  );
}
