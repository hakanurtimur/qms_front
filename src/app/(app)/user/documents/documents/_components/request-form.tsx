import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RequestDocumentModel,
  SRequestDocumentModel,
} from "@/models/user/documents/requestDocument";
import Combobox from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropZone";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  onSubmit: (data: RequestDocumentModel) => void;
}
const RequestForm = ({ onSubmit }: Props) => {
  const form = useForm<RequestDocumentModel>({
    resolver: zodResolver(SRequestDocumentModel),
    defaultValues: {
      documentType: "",
      file: undefined,
      description: "",
    },
  });

  const DUMMY_OPTIONS: { [key: string]: string } = {
    "TEST 1": "Option 1",
    "TEST 2": "Option 2",
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
        <Combobox<RequestDocumentModel>
          control={form.control}
          name={"documentType"}
          label={"Doküman Tipi"}
          options={DUMMY_OPTIONS}
        />
        <div className="w-full flex items-center justify-center">
          <Controller
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center justify-between">
                  Dosya Yükleme
                </FormLabel>
                <FormControl>
                  <Dropzone
                    onChange={(file) => field.onChange(file)}
                    className="min-h-36"
                    fileExtension="png"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={"description"}
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
          <SheetClose>
            <Button type="button" variant="outline">
              İptal Et
            </Button>
          </SheetClose>
          <SheetClose>
            <Button type="submit">Kaydet</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default RequestForm;
