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
import { FolderIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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
        className="mt-10 grid grid-cols-2 gap-8"
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
                  <Textarea className="w-full" {...field} />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="DescriptionManager"
            render={({ field }) => (
              <FormItem className="w-64 ">
                <FormLabel>${model?.UserName} - Admin Açıklaması</FormLabel>
                <FormControl>
                  <Textarea className="w-full" {...field} />
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
          <Combobox<UserRequestModelUpdate>
            control={form.control}
            variant={"in-column"}
            name={"ActionId"}
            label={"Durum"}
            options={actionIds}
          />
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
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
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
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => {
                console.log(model?.FileId);
              }}
              variant="outline"
              type="button"
              size={"icon"}
            >
              <PencilSquareIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                console.log(model?.GarbageId);
              }}
              variant="outline"
              type="button"
              size={"icon"}
            >
              <FolderIcon className="h-4 w-4" />
            </Button>
          </div>
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
