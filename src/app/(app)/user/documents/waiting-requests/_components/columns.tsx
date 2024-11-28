"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingBtn from "@/components/ui/sorting-btn";
import { formatDateWithoutTime } from "@/utils/dateUtils";
import { WaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { EyeIcon } from "lucide-react";

export const columns: ColumnDef<WaitingRequestModel>[] = [
  {
    accessorKey: "requestNo",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Talep No"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "qualityState",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Kalite Durum"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ cell }) => {
      return cell.getValue() ? "AKTİF" : "PASİF";
    },
  },
  {
    accessorKey: "managerState",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Yönetici Durum"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ cell }) => {
      return cell.getValue() ? "AKTİF" : "PASİF";
    },
  },
  {
    accessorKey: "requestDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Talep Tarihi"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ cell }) => {
      return formatDateWithoutTime(cell.getValue() as string);
    },
  },
  {
    accessorKey: "requester",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Talep Eden"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Bölüm"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "admin",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Admin Adı"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "documentType",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Doküman Tipi"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "requestType",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Talep Tipi"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "updateDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <EyeIcon
            className="h-5 w-5 hover:text-black-900 hover:scale-125 cursor-pointer"
            onClick={() =>
              column.toggleVisibility(
                column.getIsVisible() === true ? false : true,
              )
            }
          />
          <SortingBtn
            text={"Güncelleme Tarihi"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ cell }) => {
      return formatDateWithoutTime(cell.getValue() as string);
    },
  },
];
