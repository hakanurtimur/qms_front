"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { WaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const resultedColumns: ColumnDef<WaitingRequestModel>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Talep No"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return (
        <Badge variant={"defaultRounded"}>{cell.getValue() as string}</Badge>
      );
    },
    footer: "Talep No",
  },
  {
    accessorKey: "fileName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Dosya Adı"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ cell }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="w-52 truncate">{cell.getValue() as string}</div>
            </TooltipTrigger>
            <TooltipContent>{cell.getValue() as string}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    footer: "Dosya Adı",
  },
  {
    accessorKey: "administratorActionName",
    header: ({ column }) => {
      return (
        <SortingBtn
          text={"Direktör Durum"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    footer: "Direktör Durum",
  },
  {
    accessorKey: "requestTypeId",
    header: () => {
      return null;
    },
    cell: () => {
      return null;
    },
    footer: "",
  },
];
