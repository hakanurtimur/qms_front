import { z } from "zod";

// Zod şeması
export const PatientDetailsSchema = z.object({
  name: z.string(),
  bornDate: z.string(),
  patientNum: z.string().min(3, "Hasta numarası en az 3 karakter olmalıdır"),
  phoneNum: z
    .string()
    .min(7, "Telefon numarası en az 7 karakter olmalıdır")
    .optional(),
  reportType: z.number({
    required_error: "Bildirim Türü Seçiniz",
  }),
  description: z.string().min(3, "En az 3 karakter olmalıdır"),
});

export type TPatientDetails = z.infer<typeof PatientDetailsSchema>;
