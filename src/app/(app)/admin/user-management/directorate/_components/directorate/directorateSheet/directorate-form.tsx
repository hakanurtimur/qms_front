"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";

interface DirectorateModel {
  id: string;
  departmentName: string;
  email: string;
}

interface Props {
  model: DirectorateModel;
  onSubmit: (data: DirectorateModel) => void;
}

const DirectorateForm = ({ model, onSubmit }: Props) => {
  const form = useForm<DirectorateModel>({
    defaultValues: {
      ...model,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
        <FormField
          control={form.control}
          name="departmentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bölüm Adı</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail Adresi</FormLabel>
              <FormControl>
                <Input placeholder="Mail adresi giriniz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              İptal Et
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit">Kaydet</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default DirectorateForm;
