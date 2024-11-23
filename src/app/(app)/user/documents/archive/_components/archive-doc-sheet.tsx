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
  ArchiveDocSheetModel,
  SArchiveDocSheetModel,
} from "@/models/user/documents/archive/archive-document";

export const ArchiveDocSheetProps = {
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsOpen: (open: boolean) => {},
};

export default function ArchiveDocSheet({
  isOpen,
  setIsOpen,
}: typeof ArchiveDocSheetProps) {
  const form = useForm<ArchiveDocSheetModel>({
    resolver: zodResolver(SArchiveDocSheetModel),
    defaultValues: {
      categoryName: "Category A",
      folderName: "Folder A",
      fileName: "File A",
      isActive: false,
    },
  });

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
            onSubmit={() => {
              setIsOpen(false);
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
              name="isActive"
              render={({ field }) => (
                <FormItem className="items-center gap-2 flex space-y-0 pt-3 ">
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