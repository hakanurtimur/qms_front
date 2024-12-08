"use client";
import { IncidentForm, SIncidentForm } from "@/models/incidentForm";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropZone";
import { DatePicker } from "@/components/ui/date-picker";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";

interface Props {
  onSubmit: (data: IncidentForm) => void;
}

const IncidentReport = ({ onSubmit }: Props) => {
  const form = useForm<IncidentForm>({
    resolver: zodResolver(SIncidentForm),
    defaultValues: {
      date: "",
      incidentPlace: "",
      incidentDescription: "",
      file: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"space-y-7 w-full justify-center items-center bg-white"}
      >
        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name={"date"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Olay Tarihi
                </FormLabel>
                <FormControl>
                  <DatePicker
                    name={"date"}
                    onChange={(date) => field.onChange(date)}
                    includeTime={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"incidentPlace"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Olay Yeri
                </FormLabel>
                <FormControl>
                  <DynamicCombobox
                    name={"incidentPlace"}
                    options={{
                      plknk: "Dahiliye Polikliniği",
                      gnlcrh: "Genel Cerrahi Polikliniği",
                    }}
                    onChange={(value) => field.onChange(value)}
                    width="full md:w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <Controller
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-2/3 justify-center items-center">
                <FormLabel className="flex items-center justify-between">
                  Dosya Yükle
                </FormLabel>
                <FormControl>
                  <Dropzone
                    onChange={(file) => field.onChange(file)}
                    className="min-h-36"
                    fileExtensions={["pdf"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full  ">
          <FormField
            control={form.control}
            name={"incidentDescription"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Açıklama
                </FormLabel>
                <FormControl>
                  <Textarea className="w-full" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={"w-full flex items-center justify-end gap-4"}>
          <Button
            onClick={() => {
              form.reset();
            }}
            variant={"outline"}
            type={"button"}
          >
            Temizle
          </Button>
          <Button type={"submit"}>Gönder</Button>
        </div>
      </form>
    </Form>
  );
};

export default IncidentReport;
