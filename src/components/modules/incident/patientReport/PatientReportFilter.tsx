"use client";

import { IncidentFormFilter, SIncidentFormFilter } from "@/models/incidentForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmitFilter: (data: IncidentFormFilter) => void;
  onResetPatientForm: () => void;
}

const PatientReportFilter = ({
  onSubmitFilter: onSubmit,
  onResetPatientForm,
}: Props) => {
  const form = useForm<IncidentFormFilter>({
    resolver: zodResolver(SIncidentFormFilter),
    defaultValues: {
      protocolNum: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col w-full h-full gap-10 "}
      >
        <div className="flex flex-col justify-start w-full h-full gap-8 items-start">
          <FormField
            control={form.control}
            name={"protocolNum"}
            render={({ field }) => (
              <FormItem className="md:w-52">
                <FormLabel className={"flex items-center justify-between"}>
                  Protokol No
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={"number"}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex h-full items-end justify-start gap-4">
          <Button
            onClick={() => {
              onResetPatientForm();
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

export default PatientReportFilter;
