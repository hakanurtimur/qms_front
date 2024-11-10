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
import { Button } from "@/components/ui/button";
import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DocumentModel } from "@/models/document";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NonFormCombobox from "@/components/ui/nonform-combobox";

interface DataTableProps<TData, TValue> {
  departmentOps: { [key: string]: string };
  documentTypeOpts: { [key: string]: string };
  requestTypeOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  departmentOps,
  documentTypeOpts,
  requestTypeOpts,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
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
    <TooltipProvider>
      <div className="w-full overflow-scroll flex items-center justify-center no-scrollbar">
        <div className="rounded-md border no-scrollbar">
          <div className="flex items-center py-4 px-4 gap-10">
            <div className="flex flex-1 flex-shrink-0 items-center gap-10">
              <div className="flex-1">
                <NonFormCombobox
                  value={
                    (table
                      .getColumn("department")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("department")
                      ?.setFilterValue(value ? value : "")
                  }
                  placeholder={"Bölüm Adı"}
                  options={departmentOps}
                />
              </div>

              <div className="flex-1">
                <NonFormCombobox
                  value={
                    (table
                      .getColumn("documentType")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("documentType")
                      ?.setFilterValue(value ? value : "")
                  }
                  placeholder={"Doküman Tipi"}
                  options={documentTypeOpts}
                />
              </div>
              <div className="flex-1">
                <NonFormCombobox
                  value={
                    (table
                      .getColumn("requestType")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("requestType")
                      ?.setFilterValue(value ? value : "")
                  }
                  placeholder={"Talep Tipi"}
                  options={requestTypeOpts}
                />
              </div>
            </div>
            <div className="flex flex-1 max-w-[420px] flex-shrink-0 col-span-1 justify-stretch gap-2">
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
                        <div className="flex items-center gap-4">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() => {
                                  const selected =
                                    row.original as DocumentModel;
                                  // mutation.mutate(selected.fileId.toString());
                                  console.log(selected.fileId.toString());
                                }}
                                size="icon"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>TEST</TooltipContent>
                          </Tooltip>
                        </div>
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