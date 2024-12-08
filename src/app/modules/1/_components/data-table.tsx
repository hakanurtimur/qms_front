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
import { EyeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

import { useMutation } from "@tanstack/react-query";
import documentService from "@/services/DocumentService";
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
  categoryOpts: { [key: string]: string };
  folderOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  categoryOpts,
  folderOpts,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    {
      id: "categoryName",
      value: "",
    },
    {
      id: "folderName",
      value: "",
    },
    {
      id: "fileName",
      value: "",
    },
  ]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

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
    <TooltipProvider>
      <div className="w-full overflow-scroll flex items-center justify-center no-scrollbar">
        <div className="rounded-md border max-w-6xl min-w-[800px] no-scrollbar">
          <div className="flex items-center py-4 px-4 gap-10">
            <div className="flex flex-1 flex-shrink-0 items-center gap-10">
              <div className="flex flex-1 col-span-1 items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <InformationCircleIcon className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent side={"bottom"} className="ml-52 mt-3">
                    <p className="max-w-[200px] ">
                      Bu bölümde hastanemizde kullanılan rıza belgeleri ve
                      kalite dokümanları bulunmaktadır. Rıza belgeleri, hasta
                      onaylarını ve bilgilerini kaydederken, kalite dokümanları
                      hizmet standartlarını belirleyerek sürekli iyileştirmeyi
                      destekler.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex-1">
                  <NonFormCombobox
                    value={
                      (table
                        .getColumn("categoryName")
                        ?.getFilterValue() as string) || ""
                    }
                    onChange={(value) =>
                      table
                        .getColumn("categoryName")
                        ?.setFilterValue(value ? value : "")
                    }
                    placeholder={"Kategoriler"}
                    options={categoryOpts}
                  />
                </div>
              </div>
              <div className="flex flex-1 col-span-1 items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <InformationCircleIcon className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent className="ml-52 mt-3" side={"bottom"}>
                    <p className="max-w-[200px]">
                      Bu klasörde, hastanemizdeki tıbbi hizmetleri yürüten tüm
                      bölümler ve ilgili rıza belgeleri bulunmaktadır. Her
                      bölüm, uzmanlık alanına göre ayrılmış olup, tedavi
                      süreçlerinde gereken belgeleri içerir.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex-1">
                  <NonFormCombobox
                    value={
                      (table
                        .getColumn("folderName")
                        ?.getFilterValue() as string) || ""
                    }
                    onChange={(value) =>
                      table
                        .getColumn("folderName")
                        ?.setFilterValue(value ? value : "")
                    }
                    placeholder={"Klasör Adı"}
                    options={folderOpts}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 max-w-[420px] flex-shrink-0 col-span-1 justify-stretch gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <InformationCircleIcon className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent side={"bottom"} className="ml-52 mt-3">
                  <p className="max-w-[200px]">
                    Bu bölüm, tüm dokümanların isim ve kodlarını içermekte olup,
                    kullanıcıların aradıkları belgelere kolayca ulaşmalarını
                    sağlar.
                  </p>
                </TooltipContent>
              </Tooltip>
              <Input
                name="fileName"
                placeholder="Dosya Adı"
                value={
                  (table.getColumn("fileName")?.getFilterValue() as string) ||
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("fileName")
                    ?.setFilterValue(event.target.value.toLocaleUpperCase("tr"))
                }
                className="max-w-sm"
              />
            </div>
          </div>
          <div className="rounded-md border px-4 py-4">
            <Table className="table-fixed ">
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
              <TableBody className="max-w-[600px]">
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
                            const selected = row.original as DocumentModel;
                            mutation.mutate(selected.fileId.toString());
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
            <DataTablePagination isColumnHiderDropdownVisible table={table} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
