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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  PatientFeedbackFilterForm,
  SPatientFeedbackFilterForm,
} from "@/models/patientFeedbackForm";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onSubmitFilter: (data: PatientFeedbackFilterForm) => void;
}

const PatientFiltering = ({ onSubmitFilter: onSubmit }: Props) => {
  const form = useForm<PatientFeedbackFilterForm>({
    resolver: zodResolver(SPatientFeedbackFilterForm),
    defaultValues: {
      interviewer: "",
      protocolNum: "",
      patientTC: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name={"interviewer"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex items-center justify-between"}>
                <div>Görüşü Yapan</div>
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
          name={"protocolNum"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex items-center justify-between"}>
                Protokol No
              </FormLabel>
              <FormControl>
                <Input {...field} type={"number"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"patientTC"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex items-center justify-between"}>
                Hasta TC
              </FormLabel>
              <FormControl>
                <Input {...field} type={"number"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.general && (
          <p className="text-danger-500 text-sm">
            {form.formState.errors.general.message}
          </p>
        )}
        <div className="w-full flex items-center justify-end">
          <Button type={"submit"}>Getir</Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientFiltering;
