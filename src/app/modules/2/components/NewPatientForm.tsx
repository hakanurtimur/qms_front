import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatientFeedbackForm } from "@/models/patientFeedbackForm";
import { Textarea } from "@/components/ui/textarea";
import Combobox from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

interface NewPatientFormProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onSubmitPatient: (data: PatientFeedbackForm) => void;
  patientModel: PatientFeedbackForm;
}

const reportTypes = {
  tesekkur: "Teşekkür",
  sikayet: "Şikayet",
  oneri: "Öneri",
  talep: "Talep",
};

// Zod şeması
const NewPatientFormSchema = z.object({
  name: z.string(),
  bornDate: z.string(),
  patientNum: z.string().min(3, "Hasta numarası en az 3 karakter olmalıdır"),
  phoneNum: z.string().nonempty("Telefon numarası boş olamaz"),
  reportType: z.string().optional(),
  description: z.string().optional(),
});

type NewPatientFormValues = z.infer<typeof NewPatientFormSchema>;

const NewPatientForm = ({
  containerRef,
  onSubmitPatient,
  patientModel,
}: NewPatientFormProps) => {
  const form = useForm<NewPatientFormValues>({
    resolver: zodResolver(NewPatientFormSchema),
    defaultValues: {
      name: patientModel.name,
      bornDate: patientModel.bornDate,
      patientNum: patientModel.patientNum,
      phoneNum: patientModel.phoneNum ?? "",
      reportType: patientModel.reportType ?? "",
      description: patientModel.description ?? "",
    },
  });

  const onSubmit = (data: NewPatientFormValues) => {
    onSubmitPatient(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"space-y-8  animate-slide-in-from-bottom"}
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div>Ad</div>
                </FormLabel>
                <FormControl>
                  <Input className="bg-slate-100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bornDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div>Doğum Tarihi</div>
                </FormLabel>
                <FormControl>
                  <Input className="bg-slate-100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patientNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div>Hasta No</div>
                </FormLabel>
                <FormControl>
                  <Input className="bg-slate-100" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div>Telefon No</div>
                </FormLabel>
                <FormControl>
                  <Input className="bg-slate-100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reportType"
            render={({ field }) => (
              <Combobox
                control={form.control}
                {...field}
                label="Rapor Türü"
                options={reportTypes}
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div>Açıklama</div>
                </FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            ref={containerRef}
            className="w-full flex justify-end gap-4  items-end"
          >
            <Button
              onClick={() => {
                form.reset();
              }}
              variant="outline"
              type={"button"}
            >
              Temizle
            </Button>
            <Button type={"submit"}>Kaydet</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewPatientForm;
