"use client";
import {
  IncidentFormEmployee,
  SIncidentFormEmployee,
} from "@/models/incidentForm";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainerCard from "@/components/ui/formContainerCard";
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

interface Props {
  onSubmit: (data: IncidentFormEmployee) => void;
}

const EmployeeReport = ({ onSubmit }: Props) => {
  const form = useForm<IncidentFormEmployee>({
    resolver: zodResolver(SIncidentFormEmployee),
    defaultValues: {
      date: "",
      incidentPlace: "",
      incidentDescription: "",
      file: undefined,
      employeeName: "",
    },
  });

  return (
    <FormContainerCard title={"Olay Bildirimi"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
          <FormField
            control={form.control}
            name={"employeeName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Olay Bildiren
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"date"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Olay Tarihi
                </FormLabel>
                <FormControl>
                  <Input {...field} type={"date"} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"incidentDescription"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Açıklama
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  Dosya
                </FormLabel>
                <FormControl>
                  <Dropzone
                    onChange={(file) => field.onChange(file)}
                    className="min-h-28"
                    fileExtension="png"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
    </FormContainerCard>
  );
};

export default EmployeeReport;
