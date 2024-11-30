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
import { SUserRequestModelUpdate } from "@/models/user/documents/userRequests/userRequestModel";
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
import { WaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";

interface Props {
  onSubmit: (data: WaitingRequestModel) => void;
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
  const form = useForm<WaitingRequestModel>({
    resolver: zodResolver(SUserRequestModelUpdate),
    defaultValues: {
      id: model?.id ?? 0,
      actionName: model?.actionName ?? "",
      userName: model?.userName ?? "",
      departmentName: model?.departmentName ?? "",
      requestTypeName: model?.requestTypeName ?? "",
      openDate: model?.openDate ?? "",
      updateDate: model?.updateDate ?? "",
      superAdminActionId: model?.superAdminActionId ?? 0,
      superAdminAboutId: model?.superAdminAboutId ?? 0,
      documentTypeId: model?.documentTypeId ?? 0,
      documentTypeName: model?.documentTypeName ?? "",
      descriptionUser: model?.descriptionUser ?? "",
      descriptionAdmin: model?.descriptionAdmin ?? "",
      descriptionSuperAdmin: model?.descriptionSuperAdmin ?? "",
      actionId: model?.actionId ?? 0,
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
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Talep Eden</FormLabel>
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
          <FormField
            control={form.control}
            name="departmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bölüm</FormLabel>
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
          <FormField
            control={form.control}
            name="requestTypeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Talep Tipi</FormLabel>
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
          <FormField
            control={form.control}
            name="openDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Talep Tarihi</FormLabel>
                <FormControl>
                  <DatePicker
                    {...field}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Seçiniz"
                    readonly={true}
                    includeTime={true}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="updateDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Son İşlem Tarihi</FormLabel>
                <FormControl>
                  <DatePicker
                    {...field}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Seçiniz"
                    readonly={true}
                    includeTime={true}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5 border-r-2 border-primary-600 pr-4">
          {variant === "actives" && documentTypeListQpts ? (
            <Combobox<WaitingRequestModel>
              control={form.control}
              variant={"in-column"}
              name={"documentTypeId"}
              label={"Doküman Tipi"}
              options={documentTypeListQpts}
            />
          ) : (
            <FormField
              control={form.control}
              name="documentTypeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Döküman Tipi</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="descriptionUser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Talep Eden ${model?.userName} Açıklaması</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={model?.descriptionUser ?? ""}
                    rows={5}
                    className="w-full pb-3.5"
                    readOnly
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durum</FormLabel>
                <FormControl>
                  <Input {...field} value={model?.actionName ?? ""} readOnly />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descriptionAdmin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>${model?.userName} - Admin Açıklaması</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={model?.descriptionAdmin ?? ""}
                    rows={5}
                    className="w-full pb-3.5"
                    readOnly
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5 pr-4">
          <Combobox<WaitingRequestModel>
            control={form.control}
            variant={"in-column"}
            name={"superAdminActionId"}
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
                    value={model?.descriptionSuperAdmin ?? ""}
                    readOnly={variant === "default"}
                    className="w-full pb-3.5"
                    rows={5}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <Combobox<WaitingRequestModel>
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
                {model && model.garbageId && (
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
                )}
                {model && model.fileId && (
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
                )}
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

                <Button type="submit">Kaydet</Button>
              </>
            )}
          </SheetFooter>
        </div>
      </form>
    </Form>
  );
};

export default WaitingRequestSheetForm;
