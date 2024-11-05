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
import Combobox from "@/components/ui/combobox";
import { nameSurnamePairs } from "@/constants/dummy_combobox_items";

interface Props {
  onSubmitFilter: (data: PatientFeedbackFilterForm) => void;
  onReset: () => void;
}

const PatientFiltering = ({ onSubmitFilter: onSubmit, onReset }: Props) => {
  const form = useForm<PatientFeedbackFilterForm>({
    resolver: zodResolver(SPatientFeedbackFilterForm),
    defaultValues: {
      interviewer: "",
      protocolNum: "",
      patientTC: "",
    },
  });
  // değişkenlerin tanımlanması
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={""}>
        <div className="grid md:grid-cols-1 grid-cols-1 w-full gap-8 items-start mb-8 ">
          <Combobox<PatientFeedbackFilterForm>
            control={form.control}
            name={"interviewer"}
            label={"Görüşü Yapan"}
            options={nameSurnamePairs}
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
                <FormMessage className="absolute" />
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
                <FormMessage className="absolute"  />
              </FormItem>
            )}
          />
          {form.formState.errors.general && (
            <p className="text-danger-500 text-sm relative">
              {form.formState.errors.general.message}
            </p>
          )}
          
        </div>
        <div className="w-full flex pt-16 items-end justify-end gap-4

        ">
            <Button
              onClick={() => {
                onReset();
                form.reset();
              }}
              type={"button"}
              variant={"outline"}
            >
              Sıfırla
            </Button>
            <Button type={"submit"}>Getir</Button>
          </div>
      </form>
    </Form>
  );
};

export default PatientFiltering;
