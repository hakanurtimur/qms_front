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
import { Button } from "@/components/ui/button";
import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { DataTablePagination } from "@/app/modules/1/_components/data-table-pagination";
import { useMutation } from "@tanstack/react-query";
import documentService from "@/services/DocumentService";
import { Input } from "@/components/ui/input";

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

  const mutation = useMutation({
    mutationKey: ["goDoc"],
    mutationFn: (fileId: string) => documentService.goDoc(fileId),
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data.url);
      if (data.data.url) {
        window.open(data.data.url, "_blank");
      }
    },
  });

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
    <div className=" w-full overflow-scroll flex items-center justify-center">
      <div className="rounded-md border max-w-6xl min-w-[800px]">
        <div className="flex items-center py-4 px-4 justify-between gap-10">
          <Input
            name="categoryName"
            placeholder="Kategori"
            value={table.getColumn("categoryName")?.getFilterValue() as string}
            onChange={(event) =>
              table
                .getColumn("categoryName")
                ?.setFilterValue(event.target.value.toLocaleUpperCase("tr"))
            }
            className=""
          />
          <Input
            name="subCategoryName"
            placeholder="Alt Kategori"
            value={
              table.getColumn("subCategoryName")?.getFilterValue() as string
            }
            onChange={(event) =>
              table
                .getColumn("subCategoryName")
                ?.setFilterValue(event.target.value.toLocaleUpperCase("tr"))
            }
            className="max-w-sm"
          />
          <Input
            name="folderName"
            placeholder="Klasör Adı"
            value={table.getColumn("folderName")?.getFilterValue() as string}
            onChange={(event) =>
              table
                .getColumn("folderName")
                ?.setFilterValue(event.target.value.toLocaleUpperCase("tr"))
            }
            className="max-w-sm"
          />
          <Input
            name="fileName"
            placeholder="Dosya Adı"
            value={table.getColumn("fileName")?.getFilterValue() as string}
            onChange={(event) =>
              table
                .getColumn("fileName")
                ?.setFilterValue(event.target.value.toLocaleUpperCase("tr"))
            }
            className="max-w-sm"
          />
          <div className="min-w-20"></div>
        </div>
        <div className="rounded-md border px-4 py-4">
          <Table className="table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        className={`${header.id === "subCategory" ? "w-32" : ""}`}
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
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id + index}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        onClick={() => {
                          // Do not use this code block in production.
                          // const selected = data[index] as DocumentModel;
                          // mutation.mutate(selected.fileId.toString());
                          mutation.mutate("857");
                        }}
                        size="icon"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
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
