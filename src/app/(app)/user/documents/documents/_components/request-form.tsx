import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Combobox from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropZone";
import {
  RequestDocumentCreate,
  SRequestDocumentCreate,
} from "@/models/user/documents/documents/requestDocumentCreate";
import { useAuth } from "@/context/authContext";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { Input } from "@/components/ui/input";

interface Props {
  documentTypeOpts?: { [key: number]: string };
  onSubmit: (data: { userId: string; formData: RequestDocumentCreate }) => void;
  variant: "default" | "revision";
  model?: RequestDocumentListModel;
  onSheetClose: () => void;
}

const DUMMY_OPTIONS: { [key: string]: string } = {
  "TEST 1": "Option 1",
  "TEST 2": "Option 2",
};

const RequestForm = ({
  onSubmit,
  variant,
  documentTypeOpts = DUMMY_OPTIONS,
  model,
  onSheetClose,
}: Props) => {
  const { user } = useAuth();
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const form = useForm<RequestDocumentCreate>({
    resolver: zodResolver(SRequestDocumentCreate),
    defaultValues: {
      UserId: user ? +user.userId : 0,
      RoleId: user ? +user.roleId : 0,
      DepartmentId: user ? +user.departmentId : 0,
      DocumentTypeId: model
        ? model.documentTypeId
        : documentTypeOpts
          ? undefined
          : undefined,
      Description: "",
      GarbageFileName: "",
      FileId: model ? model.fileId : undefined,
      TemporaryFileName: "",
      FormFile: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formData: RequestDocumentCreate) => {
          // TODO: add this logic all validation forms
          onSubmit({ userId: user?.userId ?? "", formData });
          if (Object.keys(form.formState.errors).length === 0) {
            onSheetClose();
          }
        })}
        className="space-y-5 mt-5"
      >
        <Combobox<RequestDocumentCreate>
          control={form.control}
          variant={"in-column"}
          readonly={variant === "revision"}
          name={"DocumentTypeId"}
          label={"Doküman Tipi"}
          options={documentTypeOpts}
        />
        <div className="w-full flex items-center justify-center">
          <Controller
            control={form.control}
            name="GarbageFileName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center justify-between">
                  Dosya Yükle
                </FormLabel>
                <FormControl>
                  <Dropzone
                    onChange={(file) => {
                      if (file) {
                        field.onChange(file?.name);
                        form.setValue("FormFile", file);
                        setIsFileUploaded(true);
                      } else {
                        field.onChange("");
                        form.setValue("FormFile", undefined);
                        setIsFileUploaded(false);
                      }
                    }}
                    className="min-h-36"
                    fileExtensions={[
                      "doc",
                      "docx",
                      "png",
                      "jpeg",
                      "jpg",
                      "pdf",
                      "xls",
                      "xlsx",
                      "ppt",
                      "pptx",
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!isFileUploaded && variant === "default" && (
          <FormField
            control={form.control}
            name={"TemporaryFileName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Temsili Dosya Adı
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name={"Description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex items-center justify-between"}>
                Açıklama
              </FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetFooter>
          <Button onClick={onSheetClose} type="button" variant="outline">
            İptal Et
          </Button>
          <Button type="submit">Kaydet</Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default RequestForm;
