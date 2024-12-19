import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";

export const columns: ColumnDef<RequestDocumentListModel>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <SortingBtn
        text={"Kategori"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: (info) => <div className="">{String(info.getValue())}</div>,
    size: 180,
    footer: "Kategori",
  },
  {
    accessorKey: "folderName",
    header: ({ column }) => (
      <SortingBtn
        text={"Klasör Adı"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: (info) => <div className="">{String(info.getValue())}</div>,
    size: 140,
    footer: "Klasör Adı",
  },
  {
    accessorKey: "fileName",
    header: ({ column }) => (
      <SortingBtn
        text={"Dosya Adı"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: (info) => (
      <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="truncate">
              {String(info.getValue()).toUpperCase()}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {String(info.getValue()).toUpperCase()}
          </TooltipContent>
        </Tooltip>
      </div>
    ),
    size: 200,
    footer: "Dosya Adı",
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <SortingBtn
        text={"Durum"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: (info) => (
      <div className="">{info.getValue() ? "AKTIF" : "PASİF"}</div>
    ),
    size: 65,
    footer: "Durum",
  },
];
