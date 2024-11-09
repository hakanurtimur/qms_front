"use client";
import {
  IncidentFormEmployee,
  SIncidentFormEmployee,
} from "@/models/incidentForm";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainerCard from "@/components/ui/form-container-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropZone";
import Combobox from "@/components/ui/combobox";
import { nameSurnamePairs } from "@/constants/dummy_combobox_items";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import { DatePicker } from "@/components/ui/date-picker";

interface Props {
  onSubmit: (data: IncidentFormEmployee) => void;
}

const EmployeeReport = ({ onSubmit }: Props) => {
  const form = useForm<IncidentFormEmployee>({
    resolver: zodResolver(SIncidentFormEmployee),
    defaultValues: {
      employeeName: "",
      date: "",
      incidentPlace: "",
      incidentDescription: "",
      file: null,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full h-full">
        <div className="w-full flex flex-col gap-16">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="employeeName"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Çalışan</FormLabel>
                  <FormControl>
                    <DynamicCombobox
                      {...field}
                      options={nameSurnamePairs}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Olay Tarihi</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                      includeTime={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="incidentPlace"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Olay Yeri</FormLabel>
                  <FormControl>
                    <DynamicCombobox
                      {...field}
                      options={["Hastane", "Ev", "İşyeri"]}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="incidentDescription"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea className="w-full h-full" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Dosya Yükleme</FormLabel>
                  <FormControl>
                    <Dropzone
                      onChange={(file) => field.onChange(file)}
                      className="w-full h-full"
                      fileExtension="pdf"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-end gap-4">
            <Button
              onClick={() => {
                form.reset();
              }}
              variant="outline"
              type="button"
            >
              Temizle
            </Button>
            <Button type="submit">Gönder</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeReport;
