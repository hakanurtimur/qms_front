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
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
        <div className="grid grid-cols-2 w-full gap-8 items-end">
          <FormField
            control={form.control}
            name={"protocolNum"}
            render={({ field }) => (
              <FormItem className="flex-grow-1 flex-shrink-0">
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

          <div className="flex items-center justify-end  gap-4">
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
        </div>
      </form>
    </Form>
  );
};

export default PatientReportFilter;
