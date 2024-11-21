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
import {
  SUserRequestModelUpdate,
  UserRequestModelUpdate,
} from "@/models/user/userRequests/userRequestModel";
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

interface Props {
  onSubmit: (data: UserRequestModelUpdate) => void;
  model?: UserRequestModelUpdate;
}

const documentTypes = {
  1: "Invoice",
  2: "Purchase Order",
  3: "Travel Request",
};

const actionIds = {
  101: "Submit Request",
  102: "Approve Request",
  103: "Reject Request",
};

const RequestSheetForm = ({ onSubmit, model }: Props) => {
  const form = useForm<UserRequestModelUpdate>({
    resolver: zodResolver(SUserRequestModelUpdate),
    defaultValues: {
      RequestNumber: model ? (model.RequestNumber ?? 0) : 0,
      UserName: model ? (model.UserName ?? "") : "",
      DepartmentName: model ? (model.DepartmentName ?? "") : "",
      RequestTypeName: model ? (model.RequestTypeName ?? "") : "",
      DocumentTypeId: model ? (model.DocumentTypeId ?? 0) : 0,
      DescriptionUser: model ? (model.DescriptionUser ?? "") : "",
      DescriptionManager: model ? (model.DescriptionManager ?? "") : "",
      OpenDate: model ? (model.OpenDate ?? "") : "",
      UpdateDate: model ? (model.UpdateDate ?? "") : "",
      ActionId: model ? (model.ActionId ?? 0) : 0,
      ManagerActionName: model ? (model.ManagerActionName ?? "") : "",
      DescriptionAdmin: model ? (model.DescriptionAdmin ?? "") : "",
      AdminAboutName: model ? (model.AdminAboutName ?? "") : "",
      GarbageId: model ? (model.GarbageId ?? 0) : 0,
      FileId: model ? (model.FileId ?? 0) : 0,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8"
      >
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="UserName"
            render={({ field }) => (
              <FormItem className="w-64 ">
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
            name="DepartmentName"
            render={({ field }) => (
              <FormItem className="w-64 ">
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
            name="RequestTypeName"
            render={({ field }) => (
              <FormItem className="w-64 ">
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
        </div>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="RequestNumber"
            render={({ field }) => (
              <FormItem className="w-64 ">
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
            name="OpenDate"
            render={({ field }) => (
              <FormItem className="w-64">
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
            name="UpdateDate"
            render={({ field }) => (
              <FormItem className="w-64">
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
        <div className="col-span-2 min-h-0.5 max-h-0.5 w-full bg-primary-900"></div>
        <div className="space-y-5">
          <Combobox<UserRequestModelUpdate>
            control={form.control}
            variant={"in-column"}
            name={"DocumentTypeId"}
            label={"Doküman Tipi"}
            options={documentTypes}
          />
          <FormField
            control={form.control}
            name="DescriptionUser"
            render={({ field }) => (
              <FormItem className="w-64 ">
                <FormLabel>Talep Eden ${model?.UserName} Açıklaması</FormLabel>
                <FormControl>
                  <Textarea rows={5} className="w-full" {...field} />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <Combobox<UserRequestModelUpdate>
            control={form.control}
            variant={"in-column"}
            name={"ActionId"}
            label={"Durum"}
            options={actionIds}
          />
          <FormField
            control={form.control}
            name="DescriptionManager"
            render={({ field }) => (
              <FormItem className="w-64 ">
                <FormLabel>${model?.UserName} - Admin Açıklaması</FormLabel>
                <FormControl>
                  <Textarea rows={5} className="w-full" {...field} />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2 min-h-0.5 max-h-0.5 w-full bg-primary-900"></div>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="ManagerActionName"
            render={({ field }) => (
              <FormItem className="w-64 ">
                <FormLabel>Kalite Durum</FormLabel>
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
            name="DescriptionAdmin"
            render={({ field }) => (
              <FormItem className="w-64 ">
                <FormLabel>KYS Sorumlusu Açıklaması</FormLabel>
                <FormControl>
                  <Textarea
                    readOnly
                    className="w-full bg-primary-100"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-16">
          <FormField
            control={form.control}
            name="AdminAboutName"
            render={({ field }) => (
              <FormItem className="w-64 ">
                <FormLabel>KYS Sorumlusu Sebebi</FormLabel>
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

          <TooltipProvider>
            <div className="flex flex-col items-center justify-center gap-4 ">
              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => {
                        console.log(model?.FileId);
                      }}
                      type="button"
                      className="pb-3 pt-3 px-10 min-w-20 min-h-12"
                    >
                      <PencilSquareIcon className="min-h-8 max-h-8 w-auto" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>TEST FILENAME</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => {
                          console.log(model?.GarbageId);
                        }}
                        type="button"
                        className="pb-3 pt-3 px-10 min-w-20 min-h-12"
                      >
                        <FolderIcon className="min-h-8 max-h-8 w-auto" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>TEST FILENAME</TooltipContent>
                  </Tooltip>
                </Tooltip>
              </div>
              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      className="pb-3 pt-3 px-3 min-w-20 min-h-12"
                    >
                      Dosya Yükleme
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Dosya Yükleme İşlemi</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        className="pb-3 pt-3 px-3 min-w-20 min-h-12"
                      >
                        Dosya Revize
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Dosya Revize İşlemi</TooltipContent>
                  </Tooltip>
                </Tooltip>
              </div>
            </div>
          </TooltipProvider>
        </div>

        <div className="col-span-2">
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                İptal Et
              </Button>
            </SheetClose>

            <Button type="submit">Kaydet</Button>
          </SheetFooter>
        </div>
      </form>
    </Form>
  );
};

export default RequestSheetForm;
