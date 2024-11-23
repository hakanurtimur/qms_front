import { FormItem } from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import React from "react";
import { UserRequestModelUpdate } from "@/models/user/userRequests/userRequestModel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FolderIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

interface Props {
  model?: UserRequestModelUpdate;
  variant: "default" | "actives";
}

const RejectionSheetContent = ({ model, variant }: Props) => {
  const defaultValues = {
    Id: model ? (model.Id ?? 0) : 0,
    ActionName: model ? (model.ActionName ?? "") : "",
    AuthRequestId: model ? (model.AuthRequestId ?? 0) : 0,
    UserName: model ? (model.UserName ?? "") : "",
    DepartmentName: model ? (model.DepartmentName ?? "") : "",
    RequestTypeName: model ? (model.RequestTypeName ?? "") : "",
    DocumentTypeId: model ? (model.DocumentTypeId ?? 0) : 0,
    DocumentTypeName: model ? (model.DocumentTypeName ?? "") : "",
    DescriptionUser: model ? (model.DescriptionUser ?? "") : "",
    DescriptionAdmin: model ? (model.DescriptionAdmin ?? "") : "",
    OpenDate: model ? (model.OpenDate ?? "") : "",
    UpdateDate: model ? (model.UpdateDate ?? "") : "",
    ActionId: model ? (model.ActionId ?? 0) : 0,
    SuperAdminActionName: model ? (model.SuperAdminActionName ?? "") : "",
    DescriptionSuperAdmin: model ? (model.DescriptionSuperAdmin ?? "") : "",
    SuperAdminAboutName: model ? (model.SuperAdminAboutName ?? "") : "",
    GarbageId: model ? (model.GarbageId ?? 0) : 0,
    FileId: model ? (model.FileId ?? 0) : 0,
  };
  return (
    <div className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8">
      <div className="space-y-5 border-r-2 border-primary-600 pr-4">
        <FormItem>
          <Label>Talep No</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.Id}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Eden</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.UserName}
          />
        </FormItem>
        <FormItem>
          <Label>Bölüm</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.DepartmentName}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Tipi</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.RequestTypeName}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Tarihi</Label>
          <DatePicker
            name={"OpenDate"}
            value={defaultValues.OpenDate}
            placeholder="Seçiniz"
            readonly={true}
            includeTime={true}
          />
        </FormItem>
        <FormItem>
          <Label>Son İşlem Tarihi</Label>
          <DatePicker
            name={"UpdateDate"}
            value={defaultValues.UpdateDate}
            placeholder="Seçiniz"
            readonly={true}
            includeTime={true}
          />
        </FormItem>
      </div>
      <div className="space-y-5 border-r-2 border-primary-600 pr-4">
        <FormItem>
          <Label>Doküman Tipi</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.DocumentTypeName}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Eden ${model?.UserName} Açıklaması</Label>
          <Textarea
            rows={5}
            className="w-full pb-3.5"
            value={defaultValues.DescriptionUser}
            readOnly
          />
        </FormItem>
        <FormItem>
          <Label>Durum</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.ActionName}
          />
        </FormItem>
        <FormItem>
          <Label>${model?.UserName} - Admin Açıklaması</Label>
          <Textarea
            rows={5}
            className="w-full pb-3.5"
            value={defaultValues.DescriptionAdmin}
            readOnly
          />
        </FormItem>
      </div>
      <div className="space-y-5 pr-4">
        <FormItem>
          <Label>Kalite Durum</Label>
          <Input readOnly value={defaultValues.SuperAdminActionName} />
        </FormItem>
        <FormItem>
          <Label>KYS Sorumlusu Açıklaması</Label>
          <Textarea
            readOnly
            className="w-full bg-primary-100 pb-3.5"
            value={defaultValues.DescriptionSuperAdmin}
            rows={5}
          />
        </FormItem>
        <FormItem>
          <Label>KYS Sorumlusu Sebebi</Label>
          <Input readOnly value={defaultValues.SuperAdminAboutName} />
        </FormItem>
        <TooltipProvider>
          <div className="flex flex-col">
            <div className="text-sm font-medium leading-none h-[16.5px] flex items-end">
              Döküman
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      console.log(model?.FileId);
                    }}
                    type="button"
                    className="pb-3 pt-3 min-w-24 min-h-12"
                  >
                    <PencilSquareIcon className="min-h-8 max-h-8 w-auto" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Talep Edilen Doküman</TooltipContent>
              </Tooltip>
              <Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => {
                        console.log(model?.GarbageId);
                      }}
                      type="button"
                      className="pb-3 pt-3 min-w-24 min-h-12"
                    >
                      <FolderIcon className="min-h-8 max-h-8 w-auto" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mevcut Doküman</TooltipContent>
                </Tooltip>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>

      <div className="col-span-3 pr-4">
        <SheetFooter>
          {variant === "default" ? (
            <SheetClose asChild>
              <Button type="button">Kapat</Button>
            </SheetClose>
          ) : (
            <>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  İptal Et
                </Button>
              </SheetClose>
              <Button type="button">Onayla</Button>
              <Button variant={"destructive"} type="button">
                Reddet
              </Button>
            </>
          )}
        </SheetFooter>
      </div>
    </div>
  );
};

export default RejectionSheetContent;
