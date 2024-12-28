"use client";

import React, { useEffect, useState } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { EyeIcon, InfoIcon } from "lucide-react";
import ArchiveDocSheet from "./archive-doc-sheet";
import NonFormCombobox from "@/components/ui/nonform-combobox";

export interface ArchiveDocTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleViewDocument: (fileId: string) => void;
  handleEditDocument: (fileId: string) => void;
  handleChangeCategory: (name: string) => void;
  categoryOpts: { [key: string]: string } | null;
  folderOpts: { [key: string]: string } | null;
}

export default function ArchiveDocTable({
  columns,
  data,
  handleViewDocument,
  handleChangeCategory,
  categoryOpts,
  folderOpts,
}: ArchiveDocTableProps<RequestDocumentListModel, unknown>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const [filteredData, setFilteredData] =
    useState<RequestDocumentListModel[]>(data);

  useEffect(() => {
    let filtered = data;
    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.categoryName === selectedCategory,
      );
    }
    if (selectedFolder) {
      filtered = filtered.filter((item) => item.folderName === selectedFolder);
    }
    if (globalFilter) {
      filtered = filtered.filter((item) =>
        Object.values(item).join(" ").toUpperCase().includes(globalFilter),
      );
    }
    setFilteredData(filtered);
  }, [data, selectedCategory, selectedFolder, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <TooltipProvider>
      <div className="w-full overflow-scroll flex items-center justify-center no-scrollbar">
        <div className="rounded-md border no-scrollbar">
          <div className="flex items-center py-4 px-4 gap-10">
            <div className="flex flex-1 flex-shrink-0 items-center gap-10">
              <div className="flex flex-1 col-span-1 items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-5 h-5 text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="ml-52">
                    <p className="max-w-[200px]">
                      Kategorilere göre belge filtreleyebilirsiniz.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex-1">
                  <NonFormCombobox
                    options={categoryOpts ?? {}}
                    placeholder="KATEGORİ SEÇİNİZ"
                    onChange={(value) => {
                      setSelectedCategory(value as string);
                      handleChangeCategory(value as string);
                      setSelectedFolder(null);
                    }}
                    width="w-[300px]"
                    value={selectedCategory ?? ""}
                  />
                </div>
              </div>

              <div className="flex flex-1 col-span-1 items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-5 h-5 text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="ml-52">
                    <p className="max-w-[200px]">
                      Klasörlere göre belge filtreleyebilirsiniz.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex-1">
                  <NonFormCombobox
                    options={folderOpts ?? {}}
                    placeholder="KATEGORİ SEÇİNİZ"
                    onChange={(value) => setSelectedFolder(value as string)}
                    width="w-[300px]"
                    value={selectedFolder ?? ""}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 max-w-[520px] flex-shrink-0 col-span-1 justify-end gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="w-5 h-5 text-gray-600" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="ml-52">
                  <p className="max-w-[200px]">
                    Belge isimlerinde arama yapabilirsiniz.
                  </p>
                </TooltipContent>
              </Tooltip>
              <Input
                placeholder="DOSYA ADI İLE ARA"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value.toUpperCase())}
                className="w-[400px]"
              />
            </div>
          </div>

          <div className="rounded-md border px-4 py-4">
            <Table className="table-fixed">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{ width: header.column.columnDef.size }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                    <TableHead className="w-40 text-right pr-12">
                      İşlem
                    </TableHead>
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        <div className="flex items-center gap-2 justify-end">
                          <ArchiveDocSheet data={row.original} />
                          <Tooltip>
                            <TooltipTrigger>
                              <EyeIcon
                                className="w-8 h-8 p-2 rounded-md bg-primary-800 text-white cursor-pointer "
                                onClick={() =>
                                  handleViewDocument(
                                    String(row.original.fileId),
                                  )
                                }
                              />
                            </TooltipTrigger>
                            <TooltipContent>Görüntüle</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="text-center h-24"
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
