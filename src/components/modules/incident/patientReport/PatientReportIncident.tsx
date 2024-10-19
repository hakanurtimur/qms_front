"use client";
import { IncidentFormPatient, SIncidentForm } from "@/models/incidentForm";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropZone";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
  patientFormModel: IncidentFormPatient | null;
  onPatientReportSubmit: (data: IncidentFormPatient) => void;
}

const PatientReportIncident = ({
  containerRef,
  patientFormModel,
  onPatientReportSubmit: onSubmit,
}: Props) => {
  const form = useForm<IncidentFormPatient>({
    resolver: zodResolver(SIncidentForm),
    defaultValues: {
      name: patientFormModel?.name || "",
      bornDate: patientFormModel?.bornDate || "",
      patientNum: patientFormModel?.patientNum || "",
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
        className={"space-y-8 animate-slide-in-from-bottom"}
      >
        <div className="grid grid-cols-2 items-center gap-8 mt-8">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Hasta Adı
                </FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-slate-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"bornDate"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Doğum Tarihi
                </FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-slate-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"patientNum"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Hasta No
                </FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-slate-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"phoneNum"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Telefon No
                </FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-slate-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
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
        </div>
        <FormField
          control={form.control}
          name={"incidentDescription"}
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
        <div className="w-full flex items-center justify-center">
          <div className="w-1/2">
            <Controller
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    Dosya Yükleme
                  </FormLabel>
                  <FormControl>
                    <Dropzone
                      onChange={(file) => field.onChange(file)}
                      className="min-h-36"
                      fileExtension="pdf"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div
          ref={containerRef}
          className={"w-full flex items-center justify-center gap-4"}
        >
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

export default PatientReportIncident;
