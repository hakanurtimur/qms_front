import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  PatientFeedbackForm,
  SPatientFeedbackForm,
} from "@/models/patientFeedbackForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
  onSubmitPatient: (data: PatientFeedbackForm) => void;
  patientModel: PatientFeedbackForm;
  onReset: () => void;
}

const PatientInformation = ({
  containerRef,
  onSubmitPatient: onSubmit,
  patientModel,
  onReset,
}: Props) => {
  const form = useForm<PatientFeedbackForm>({
    resolver: zodResolver(SPatientFeedbackForm),
    defaultValues: {
      name: patientModel.name,
      bornDate: patientModel.bornDate,
      patientNum: patientModel.patientNum,
      phoneNum: patientModel.phoneNum,
      description: patientModel.description,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"space-y-8 animate-slide-in-from-bottom"}
      >
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex items-center justify-between"}>
                <div>Hasta Adı</div>
              </FormLabel>
              <FormControl>
                <Input {...field} readOnly />
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
                <div>Doğum Tarihi</div>
              </FormLabel>
              <FormControl>
                <Input {...field} readOnly />
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
                <div>Hasta No</div>
              </FormLabel>
              <FormControl>
                <Input {...field} readOnly />
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
                <div>Telefon Numarası</div>
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
          name={"reportType"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex items-center justify-between"}>
                <div>Bildirim Türü</div>
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
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex items-center justify-between"}>
                <div>Açıklama</div>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          ref={containerRef}
          className="w-full flex items-center justify-end gap-4"
        >
          <Button onClick={onReset} variant="outline" type={"button"}>
            Temizle
          </Button>
          <Button type={"submit"}>Kaydet</Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientInformation;
