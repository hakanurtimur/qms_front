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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col w-full h-full"}
      >
        <div className="flex flex-col h-full w-full gap-8  justify-between mb-5  ">
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
                  <Input {...field} type={"text"}
                     onKeyDown={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }
                    }
                  />
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
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          {form.formState.errors.general && (
            <p className="text-danger-500 text-sm relative">
              {form.formState.errors.general.message}
            </p>
          )}
          <div className="w-full h-full flex  items-end justify-start gap-4">
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
        </div>
      </form>
    </Form>
  );
};

export default PatientFiltering;
