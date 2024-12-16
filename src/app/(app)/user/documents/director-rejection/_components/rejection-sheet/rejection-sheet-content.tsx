import { FormItem } from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import React from "react";
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
import { DirectorRejectionDetailsModel } from "@/models/user/documents/director-rejection/director-rejection";

interface Props {
  model?: DirectorRejectionDetailsModel;
  variant: "default" | "actives";
  onGetGarbage: (garbageId: string) => void;
  onGetFile: (fileId: string) => void;
  onApproveRequest: (action_id: number) => void;
}

const RejectionSheetContent = ({
  model,
  variant,
  onGetFile,
  onGetGarbage,
  onApproveRequest,
}: Props) => {
  const defaultValues = {
    id: model ? (model.id ?? 0) : 0,
    actionName: model ? (model.actionName ?? "") : "",
    userName: model ? (model.userName ?? "") : "",
    departmentName: model ? (model.departmentName ?? "") : "",
    requestTypeName: model ? (model.requestTypeName ?? "") : "",
    documentTypeId: model ? (model.documentTypeName ?? 0) : 0,
    descriptionUser: model ? (model.descriptionUser ?? "") : "",
    descriptionManager: model ? (model.descriptionManager ?? "") : "",
    openDate: model ? (model.openDate ?? "") : "",
    updateDate: model ? (model.updateDate ?? "") : "",
    superAdminActionName: model ? (model.superAdminActionName ?? "") : "",
    descriptionSuperAdmin: model ? (model.descriptionSuperAdmin ?? "") : "",
    superAdminAboutName: model ? (model.superAdminAboutName ?? "") : "",
    garbageId: model ? (model.garbageId ?? 0) : 0,
    fileId: model ? (model.fileId ?? 0) : 0,
  };

  return (
    <div className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8">
      <div className="space-y-5 border-r-2 border-primary-600 pr-4">
        <FormItem>
          <Label>Talep No</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.id}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Eden</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.userName}
          />
        </FormItem>
        <FormItem>
          <Label>Bölüm</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.departmentName}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Tipi</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.requestTypeName}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Tarihi</Label>
          <DatePicker
            name={"openDate"}
            value={defaultValues.openDate}
            placeholder="Seçiniz"
            readonly={true}
            includeTime={true}
          />
        </FormItem>
        <FormItem>
          <Label>Son İşlem Tarihi</Label>
          <DatePicker
            name={"UpdateDate"}
            value={defaultValues.updateDate}
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
            value={defaultValues.documentTypeId}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Eden {model?.userName} Açıklaması</Label>
          <Textarea
            rows={5}
            className="w-full pb-3.5"
            value={defaultValues.descriptionUser}
            readOnly
          />
        </FormItem>
        <FormItem>
          <Label>Durum</Label>
          <Input
            readOnly
            className="w-full bg-primary-100"
            value={defaultValues.actionName}
          />
        </FormItem>
        <FormItem>
          <Label>{model?.userName} - Admin Açıklaması</Label>
          <Textarea
            rows={5}
            className="w-full pb-3.5"
            value={defaultValues.descriptionManager}
            readOnly
          />
        </FormItem>
      </div>
      <div className="space-y-5 pr-4">
        <FormItem>
          <Label>Kalite Durum</Label>
          <Input readOnly value={defaultValues.superAdminActionName} />
        </FormItem>
        <FormItem>
          <Label>Açıklama</Label>
          <Textarea
            readOnly
            className="w-full bg-primary-100 pb-3.5"
            value={defaultValues.descriptionSuperAdmin}
            rows={5}
          />
        </FormItem>
        <FormItem>
          <Label>Talep Nedeni</Label>
          <Input readOnly value={defaultValues.superAdminAboutName} />
        </FormItem>
        <TooltipProvider>
          <div className="flex flex-col">
            <div className="text-sm font-medium leading-none h-[16.5px] flex items-end">
              Doküman
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  {model?.garbageId && (
                    <Button
                      onClick={() => {
                        onGetGarbage(model?.garbageId.toString());
                      }}
                      type="button"
                      className="pb-3 pt-3 min-w-24 min-h-12"
                    >
                      <PencilSquareIcon className="min-h-8 max-h-8 w-auto" />
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>Talep Edilen Doküman</TooltipContent>
              </Tooltip>
              <Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {model?.fileId && (
                      <Button
                        onClick={() => {
                          onGetFile(model?.fileId.toString());
                        }}
                        type="button"
                        className="pb-3 pt-3 min-w-24 min-h-12"
                      >
                        <FolderIcon className="min-h-8 max-h-8 w-auto" />
                      </Button>
                    )}
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
              <SheetClose>
                <Button onClick={() => onApproveRequest(1)} type="button">
                  Onayla
                </Button>
              </SheetClose>
              <SheetClose>
                <Button
                  onClick={() => onApproveRequest(2)}
                  variant={"destructive"}
                  type="button"
                >
                  Reddet
                </Button>
              </SheetClose>
            </>
          )}
        </SheetFooter>
      </div>
    </div>
  );
};

export default RejectionSheetContent;
