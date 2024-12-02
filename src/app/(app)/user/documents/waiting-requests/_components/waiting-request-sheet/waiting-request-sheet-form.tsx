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

import React from "react";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { FolderIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SUpdateWaitingRequestModel,
  UpdateWaitingRequestModel,
  WaitingRequestModel,
} from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";

interface Props {
  onSubmit: (data: UpdateWaitingRequestModel) => void;
  model?: WaitingRequestModel;
  variant: "default" | "actives";
  superAdminActionOpts: { [key: number]: string };
  superAdminAboutOpts: { [key: number]: string };
  handleGetGarbage: (fileId: string) => void;
  handleGetFile: (fileId: string) => void;
  documentTypeListQpts?: { [key: number]: string };
}

const WaitingRequestSheetForm = ({
  onSubmit,
  model,
  variant,
  superAdminActionOpts,
  superAdminAboutOpts,
  handleGetGarbage,
  handleGetFile,
  documentTypeListQpts,
}: Props) => {
  const { user } = useAuth();
  const form = useForm<UpdateWaitingRequestModel>({
    resolver: zodResolver(SUpdateWaitingRequestModel),
    defaultValues: {
      id: model?.id ?? 0,
      userId: user && user.userId ? +user.userId : 0,
      superAdminActionId: model?.superAdminActionId ?? 0,
      documentTypeId: model?.documentTypeId ?? 0,
      superAdminAboutId: model?.superAdminAboutId ?? 0,
      descriptionSuperAdmin: model?.descriptionSuperAdmin ?? "",
      //,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                    readOnly
                    className="w-full bg-primary-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <FormItem>
            <Label>Talep Eden</Label>
            <Input
              value={model?.userName ?? ""}
              readOnly
              className="w-full bg-primary-100"
            />
          </FormItem>
          <FormItem>
            <Label>Bölüm</Label>
            <Input
              value={model?.departmentName ?? ""}
              readOnly
              className="w-full bg-primary-100"
            />
            <FormMessage className="absolute" />
          </FormItem>
          <FormItem>
            <FormLabel>Talep Tipi</FormLabel>
            <Input
              value={model?.requestTypeName ?? ""}
              readOnly
              className="w-full bg-primary-100"
            />
          </FormItem>
          <FormItem>
            <Label>Talep Tarihi</Label>
            <DatePicker
              name={"openDate"}
              value={model?.openDate ?? ""}
              onChange={(value) => {
                console.log(value);
              }}
              placeholder="Seçiniz"
              readonly={true}
              includeTime={true}
            />
          </FormItem>
          <FormItem>
            <Label>Son İşlem Tarihi</Label>
            <DatePicker
              name={"updateDate"}
              value={model?.updateDate ?? ""}
              onChange={(value) => {
                console.log(value);
              }}
              placeholder="Seçiniz"
              readonly={true}
              includeTime={true}
            />
          </FormItem>
        </div>
        <div className="space-y-5 border-r-2 border-primary-600 pr-4">
          {variant === "actives" && documentTypeListQpts ? (
            <Combobox<UpdateWaitingRequestModel>
              control={form.control}
              variant={"in-column"}
              name={"documentTypeId"}
              label={"Doküman Tipi"}
              options={documentTypeListQpts}
            />
          ) : (
            <FormItem>
              <Label>Döküman Tipi</Label>
              <FormControl>
                <Input value={model?.documentTypeName} readOnly />
              </FormControl>
            </FormItem>
          )}

          <FormItem>
            <Label>Talep Eden {model?.userName} Açıklaması</Label>
            <Textarea
              value={model?.descriptionUser ?? ""}
              rows={5}
              className="w-full pb-3.5"
              readOnly
            />
          </FormItem>

          <FormItem>
            <Label>Durum</Label>
            <Input value={model?.actionName ?? ""} readOnly />
          </FormItem>

          <FormItem>
            <Label>{model?.userName} - Admin Açıklaması</Label>
            <Textarea
              value={model?.descriptionAdmin ?? ""}
              rows={5}
              className="w-full pb-3.5"
              readOnly
            />
            <FormMessage className="absolute" />
          </FormItem>
        </div>
        <div className="space-y-5 pr-4">
          <Combobox<UpdateWaitingRequestModel>
            control={form.control}
            name={"superAdminActionId"}
            variant={"in-column"}
            label={"Kalite Durum"}
            options={superAdminActionOpts}
            readonly={variant === "default"}
          />
          <FormField
            control={form.control}
            name="descriptionSuperAdmin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KYS Sorumlusu Açıklaması</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    readOnly={variant === "default"}
                    className="w-full pb-3.5"
                    rows={5}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <Combobox<UpdateWaitingRequestModel>
            control={form.control}
            name={"superAdminAboutId"}
            variant={"in-column"}
            label={"KYS Sorumlusu Sebebi"}
            options={superAdminAboutOpts}
            readonly={variant === "default"}
          />
          <TooltipProvider>
            <div className="flex flex-col">
              <div className="text-sm font-medium leading-none h-[16.5px] flex items-end">
                Döküman
              </div>
              <div className="flex items-center gap-4 mt-4">
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
    </Form>
  );
};

export default WaitingRequestSheetForm;
