import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import {
  SUpdateDocumentDemandModel,
  UpdateDocumentDemandModel,
  UserRequestModel,
} from "@/models/user/documents/userRequests/userRequestModel";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { FolderIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import GarbageUpdaterDialog from "@/app/(app)/user/documents/requests/_components/request-sheet/garbage-updater-dialog";
import NonFormCombobox from "@/components/ui/nonform-combobox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import { toast } from "@/hooks/use-toast";

interface Props {
  onSubmit: (data: UpdateDocumentDemandModel) => void;
  model?: UserRequestModel;
  variant: "default" | "actives";
  documentTypeListOpts: { [key: string]: string };
  actionTypeListOpts: { [key: string]: string };
  handleGetGarbage: (fileId: string) => void;
  handleGetFile: (fileId: string) => void;
  handleRefresh: () => void;
}

const RequestSheetForm = ({
  onSubmit,
  model,
  variant,
  documentTypeListOpts,
  actionTypeListOpts,
  handleGetGarbage,
  handleGetFile,
  handleRefresh,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const form = useForm<UpdateDocumentDemandModel>({
    resolver: zodResolver(SUpdateDocumentDemandModel),
    defaultValues: {
      id: model ? (model.id ?? 0) : 0,
      userId: user ? +user?.userId : 0,
      roleId: user ? +user?.roleId : 0,
      descriptionUser: model
        ? model.descriptionUser !== null
          ? model.descriptionUser
          : ""
        : "",
      descriptionAdmin: model ? (model.descriptionAdmin ?? "") : "",
      actionId: model ? (model.actionId ?? 0) : 0,
      garbageFileName: null,
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (e) => {
            onSubmit(e);
            await handleRefresh();
          })}
          className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8"
        >
          <div className="space-y-5 border-r-2 border-primary-600 pr-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Talep No</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={model?.id}
                      readOnly
                      className="w-full bg-primary-100"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <FormItem>
              <Label>Talep Eden</Label>
              <Input
                readOnly
                className="w-full bg-primary-100"
                value={model?.userName ?? ""}
              />
            </FormItem>
            <FormItem>
              <Label>Bölüm</Label>
              <Input
                readOnly
                className="w-full bg-primary-100"
                value={model?.departmentName ?? ""}
              />
            </FormItem>
            <FormItem>
              <Label>Talep Tipi</Label>
              <Input
                readOnly
                className="w-full bg-primary-100"
                value={model?.requestTypeName ?? ""}
              />
            </FormItem>
            <FormItem>
              <Label>Talep Tarihi</Label>
              <Input name={"openDate"} value={model?.openDate ?? ""} readOnly />
            </FormItem>
            <FormItem>
              <Label>Son İşlem Tarihi</Label>
              <Input
                name={"updateDate"}
                value={model?.updateDate ?? ""}
                readOnly
              />
            </FormItem>
          </div>
          <div className="space-y-5 border-r-2 pt-[9px] border-primary-600 pr-4">
            <NonFormCombobox
              label={"Doküman Tipi"}
              value={model?.documentTypeId.toString() ?? "0"}
              options={documentTypeListOpts}
              readonly
              onChange={() => {}}
            />
            <FormField
              control={form.control}
              name="descriptionUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{model?.userName} - Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="w-full pb-3.5"
                      {...field}
                      value={field.value ?? ""}
                      readOnly={
                        variant === "default" || model?.authRequestId !== 0
                      }
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            {variant === "actives" ? (
              <>
                {model?.authRequestId !== 0 ? (
                  <Combobox<UpdateDocumentDemandModel>
                    control={form.control}
                    variant={"in-column"}
                    name={"actionId"}
                    label={"Durum"}
                    options={actionTypeListOpts}
                  />
                ) : (
                  <FormItem>
                    <Label>Durum</Label>
                    <Input value={model?.actionName ?? ""} readOnly />
                  </FormItem>
                )}
              </>
            ) : (
              <FormItem>
                <Label>Durum</Label>
                <Input value={model?.actionName ?? ""} readOnly />
              </FormItem>
            )}
            <FormField
              control={form.control}
              name="descriptionAdmin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{model?.adminName} - Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="w-full pb-3.5"
                      {...field}
                      value={field.value ?? ""}
                      readOnly={
                        variant === "default" || model?.authRequestId !== 1
                      }
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-5 pr-4">
            <FormItem>
              <Label>Kalite Durum</Label>
              <Input
                readOnly
                className="w-full bg-primary-100"
                value={model?.superAdminActionName ?? ""}
              />
            </FormItem>

            <FormItem>
              <Label>{model?.superAdminName} - Açıklama</Label>
              <Textarea
                readOnly
                className="w-full bg-primary-100 pb-3.5"
                value={model?.descriptionSuperAdmin ?? ""}
                rows={5}
              />
            </FormItem>

            <FormItem>
              <Label>Talep Nedeni</Label>
              <Input
                readOnly
                className="w-full bg-primary-100"
                value={model?.superAdminAboutName ?? ""}
              />
            </FormItem>
            <div>
              {form.getValues("garbageFileName") && (
                <div>
                  <Label>Revize Dokümanı</Label>
                  <Input
                    readOnly
                    className="w-full bg-primary-100"
                    value={form.getValues("garbageFileName") ?? ""}
                  />
                </div>
              )}
            </div>

            <TooltipProvider>
              <div className="flex flex-col">
                {(!!model?.garbageId || !!model?.fileId) && (
                  <div className="text-sm font-medium leading-none h-[16.5px] flex items-end">
                    Doküman
                  </div>
                )}
                <div className="flex items-center gap-4 mt-4">
                  {variant === "actives" && model && model.actionId === 2 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => {
                            setOpen(true);
                          }}
                          variant={"outline"}
                          type="button"
                          className="pb-3 pt-3 min-w-12 min-h-12"
                        >
                          {!(model.garbageId === 0 || !model.garbageId) ? (
                            <ArrowPathIcon className="min-h-8 max-h-8 w-auto" />
                          ) : (
                            <PlusIcon className="min-h-8 max-h-8 w-auto" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {!(model.garbageId === 0 || !model.garbageId)
                          ? "Talep Dokümanı Değiştir"
                          : "Talep Dokümanı Yükle"}
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {model && model.garbageId ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => {
                            handleGetGarbage(model.garbageId.toString());
                          }}
                          type="button"
                          className="pb-3 pt-3 min-w-24 min-h-12"
                        >
                          <PencilSquareIcon className="min-h-8 max-h-8 w-auto" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Talep Edilen Doküman</TooltipContent>
                    </Tooltip>
                  ) : null}
                  {model && model.fileId ? (
                    <Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => {
                              handleGetFile(model.fileId.toString());
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
                  ) : null}
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
                  <SheetClose asChild>
                    <Button type="submit">Kaydet</Button>
                  </SheetClose>
                </>
              )}
            </SheetFooter>
          </div>
        </form>
        <FormField
          name={"garbageFileName"}
          render={({ field }) => (
            <GarbageUpdaterDialog
              open={open}
              onClose={() => setOpen(false)}
              onChange={(file) => {
                field.onChange(file?.name);
                if (file) {
                  form.setValue("formFile", file);
                }
                toast({
                  title: "Dosya eklendi",
                  description: "Dosya başarıyla eklendi",
                  variant: "success",
                });
              }}
            />
          )}
        />
      </Form>
    </>
  );
};

export default RequestSheetForm;
