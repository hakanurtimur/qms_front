// CategorySheet.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SRequestDocumentListModel,
  RequestDocumentListModel,
} from "@/models/user/documents/documents/requestDocument";
import { useEffect } from "react";

export interface ArchiveDocSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleSubmit: (state: boolean, fileId: number) => void;
  data: RequestDocumentListModel;
}

export default function ArchiveDocSheet({
  isOpen,
  setIsOpen,
  data,
  handleSubmit,
}: ArchiveDocSheetProps) {
  const form = useForm<RequestDocumentListModel>({
    resolver: zodResolver(SRequestDocumentListModel),
    defaultValues: {
      categoryName: data?.categoryName,
      folderName: data?.folderName,
      fileName: data?.fileName,
      state: data?.state,
    },
  });
  useEffect(() => {
    if (data) {
      form.reset({
        categoryName: data?.categoryName,
        folderName: data?.folderName,
        fileName: data?.fileName,
        state: data?.state,
      });
    }
  }, [data, form]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Arşivleme</SheetTitle>
          <SheetDescription>
            Dökümanın arşivlenme işlemlerini buradan yapabilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              setIsOpen(false);
              handleSubmit(form.getValues().state, data.fileId);
              e.preventDefault(); // Sayfanın yenilenmesini engelle
            }}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Adı</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      placeholder="Kategori adını girin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="folderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Klasör Adı</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      placeholder="Klasör adını girin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosya Adı</FormLabel>
                  <FormControl>
                    <Textarea
                      readOnly
                      placeholder="Dosya adını girin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="items-center gap-2 flex space-y-0 pt-3 ">
                  <FormLabel>Pasif</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormLabel>Aktif</FormLabel>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                İptal Et
              </Button>
              <Button type="submit">Kaydet</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
