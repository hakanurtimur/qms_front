"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  SRequestDocumentListModel,
  RequestDocumentListModel,
} from "@/models/user/documents/documents/requestDocument";
import { useUserUpdateArchiveDocuments } from "../lib/hooks/useUserUpdateArchiveDocuments";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { useUserGetArchiveDocuments } from "../lib/hooks/useUserGetArchiveDocuments";

export interface ArchiveDocFormProps {
  data: RequestDocumentListModel;
}

export default function ArchiveDocForm({ data }: ArchiveDocFormProps) {
  const { user } = useAuth();
  const { refetch: refetchArchive } = useUserGetArchiveDocuments();
  const form = useForm<RequestDocumentListModel>({
    resolver: zodResolver(SRequestDocumentListModel),
    defaultValues: {
      categoryName: data?.categoryName,
      folderName: data?.folderName,
      fileName: data?.fileName,
      state: data?.state,
      fileId: data?.fileId,
    },
  });

  const userUpdateArchiveMutation = useUserUpdateArchiveDocuments(
    () => {
      toast({
        title: "Başarılı",
        description: "Doküman güncellendi",
        variant: "success",
      });
      refetchArchive().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Doküman güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  const handleSubmit = (state: boolean, fileId: number) => {
    if (!user) return;
    userUpdateArchiveMutation.mutate({
      userId: user.userId,
      fileId,
      state,
    });
  };

  const onSaveClick = () => {
    const updatedState = form.getValues("state");
    handleSubmit(updatedState, data?.fileId ?? 0);
  };

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
    <Form {...form}>
      <form className="space-y-5">
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori Adı</FormLabel>
              <FormControl>
                <Input readOnly placeholder="Kategori adını girin" {...field} />
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
                <Input readOnly placeholder="Klasör adını girin" {...field} />
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
                <Textarea readOnly placeholder="Dosya adını girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="items-center gap-2 flex space-y-0 pt-3">
              <FormLabel>Pasif</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Aktif</FormLabel>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              İptal Et
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="button" onClick={onSaveClick}>
              Kaydet
            </Button>
          </SheetClose>
        </div>
      </form>
    </Form>
  );
}
