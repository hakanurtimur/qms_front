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
  VisibilityState,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { EyeIcon, InfoIcon } from "lucide-react";
import ArchiveDocSheet from "./archive-doc-sheet";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { useUserGetArchiveDocuments } from "../lib/hooks/useUserGetArchiveDocuments";
import { useUserUpdateArchiveDocuments } from "../lib/hooks/useUserUpdateArchiveDocuments";

export interface ArchiveDocTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  handleViewDocument: (fileId: string) => void;
  handleEditDocument: (fileId: string) => void;
}
export default function ArchiveDocTable({
  columns,
  handleViewDocument,
  handleEditDocument,
}: ArchiveDocTableProps<RequestDocumentListModel, unknown>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [categoryType, setCategoryType] = useState<string[] | null>();
  const [folderType, setFolderType] = useState<string[] | null>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    categoryName: true,
    folderName: true,
    state: true,
    fileName: true,
    actions: true,
  });
  const auth = useAuth();
  const { data, refetch } = useUserGetArchiveDocuments();

  const [searchResults, setSearchResults] = useState<
    RequestDocumentListModel[]
  >(data?.data ?? []);

  const getCategoryTypes = () => {
    const categoryTypes = data?.data.map(
      (item: { categoryName: string }) => item.categoryName,
    );
    const uniqueCategoryTypes = Array.from(new Set(categoryTypes));
    setCategoryType(uniqueCategoryTypes as string[]);
  };

  const getFolderTypes = () => {
    const folderTypes = data?.data.map(
      (item: { folderName: string }) => item.folderName,
    );
    const uniqueFolderTypes = Array.from(new Set(folderTypes));
    setFolderType(uniqueFolderTypes as string[]);
  };

  useEffect(() => {
    getCategoryTypes();
    getFolderTypes();
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSearch = () => {
    // Klasör ve kategoriye göre arama yap
    const results = data?.data.filter(
      (item: { categoryName: string; folderName: string }) =>
        (selectedCategory ? item.categoryName === selectedCategory : true) &&
        (selectedFolder ? item.folderName === selectedFolder : true),
    );

    setSearchResults(results ?? []);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedFolder]);

  // Kategori seçimi
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    handleSearch();
  };

  // Klasör seçimi
  const handleFolderChange = (folder: string) => {
    setSelectedFolder(folder);
    handleSearch();
  };

  const table = useReactTable({
    data: searchResults,
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
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const updateArchiveDocumentsMutation = useUserUpdateArchiveDocuments(
    () => {
      toast({
        title: "Başarılı",
        description: "Döküman başarıyla güncellendi",
        variant: "success",
      });
      refetch().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Döküman güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  const handleSubmitArchiveSheet = (state: boolean, fileId: number) => {
    updateArchiveDocumentsMutation.mutate({
      userId: Number(auth.user?.userId),
      fileId: fileId,
      state: state,
    });
  };

  return (
    <TooltipProvider>
      <div className="w-full overflow-scroll flex flex-col items-center justify-center no-scrollbar border  rounded">
        <div className="flex justify-between gap-10 w-full mb-4  items-center">
          <div className="flex  items-center justify-center gap-8 pt-3 px-4">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon
                    className="w-6 h-6 text-black-700 cursor-pointer"
                    aria-label="Açıklama"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="
                  max-w-[300px]
                  ml-72
                "
                >
                  Bu bölümde hastanemizde kullanılan rıza belgeleri ve kalite
                  dokümanları bulunmaktadır. Rıza belgeleri, hasta onaylarını ve
                  bilgilerini kaydederken, kalite dokümanları hizmet
                  standartlarını belirleyerek sürekli iyileştirmeyi destekler.
                </TooltipContent>
              </Tooltip>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-64 h-10">
                  <SelectValue placeholder="Kategoriler" />
                </SelectTrigger>
                <SelectContent className="w-64">
                  {categoryType?.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon
                    className="w-6 h-6 text-black-700 cursor-pointer"
                    aria-label="Açıklama"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="
                  max-w-[300px]
                  ml-72
                "
                >
                  Bu klasörde, hastanemizdeki tıbbi hizmetleri yürüten tüm
                  dokümanlar yer almaktadır. Her bölüm, uzmanlık alanına göre
                  ayrılmış olup, tedavi süreçlerinde gereken belgeleri içerir.
                </TooltipContent>
              </Tooltip>
              <Select onValueChange={handleFolderChange}>
                <SelectTrigger className="w-64 h-10">
                  <SelectValue placeholder="Klasörler" />
                </SelectTrigger>
                <SelectContent className="w-64">
                  {folderType?.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-1 justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon
                  className="w-6 h-6 mt-3 text-black-700 cursor-pointer"
                  aria-label="Açıklama"
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="
                max-w-[300px]
                ml-72
                "
              >
                Bu bölüm, tüm dokümanların isim ve kodlarını içermekte olup,
                kullanıcıların aradıkları belgelere kolayca ulaşmalarını sağlar.
              </TooltipContent>
            </Tooltip>
            <Input
              placeholder="Dosya adı ara..."
              value={globalFilter ?? ""}
              onChange={(e) => {
                // hep büyük harfe çevir
                const upperCaseValue = e.target.value.toUpperCase();
                setGlobalFilter(upperCaseValue);
              }}
              className="w-[473px] h-10 mx-4 mt-3
            "
            />
          </div>
        </div>
        <div className="rounded-md border w-full min-w-[800px] no-scrollbar">
          <div className="rounded-md  px-4 py-4 no-scrollbar">
            <Table className="table-fixed">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <TableHead
                          key={header.id + index}
                          style={{
                            width: header.column.columnDef.size,
                          }}
                          hidden={header.column.columnDef.enableHiding}
                        >
                          <div
                            className="flex items-center cursor-pointer hover:text-black-900"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}

                            {{}[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </TableHead>
                      );
                    })}
                    <TableHead className="w-20 pl-16">İşlem</TableHead>
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id + index}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => {}}
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell
                          onClick={() => {
                            console.log("cell", cell.id);
                          }}
                          key={cell.id + index}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        <div className="flex items-center justify-end gap-4">
                          <Tooltip>
                            <TooltipTrigger
                              asChild
                              onClick={() => {
                                handleViewDocument(String(row.original.fileId));
                              }}
                            >
                              <ArchiveDocSheet
                                data={row.original}
                                handleSubmit={handleSubmitArchiveSheet}
                              />
                            </TooltipTrigger>
                            <TooltipContent>Görüntüle</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger
                              asChild
                              onClick={() => {
                                handleEditDocument(String(row.original.fileId));
                              }}
                            >
                              <EyeIcon className="w-9 h-9 p-2 rounded-md border text-white bg-black-900 hover:bg-black-800 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>Düzenle</TooltipContent>
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
            <DataTablePagination isColumnHiderDropdownVisible table={table} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
