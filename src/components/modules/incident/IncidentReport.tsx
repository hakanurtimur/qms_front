"use client";
import { IncidentForm, SIncidentForm } from "@/models/incidentForm";
import { useForm } from "react-hook-form";
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      form.setValue("file", files[0]);
    } else {
      form.setValue("file", undefined);
    }
  };

  return (
    <FormContainerCard title={"Olay Bildirimi"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
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
          <FormField
            control={form.control}
            name={"file"}
            render={() => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Dosya
                </FormLabel>
                <FormControl>
                  <Input onChange={handleFileChange} type={"file"} />
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

export default IncidentReport;
