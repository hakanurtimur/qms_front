import { z } from "zod";

export const SIncidentForm = z.object({
  date: z.string().min(1, "Tarih seçiniz"),
  incidentPlace: z.string().min(1, "Olay yeri seçiniz"),
  incidentDescription: z.string().min(3, "En az 3 karakter olmalıdır"),
  file: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Boş bir dosya yükleyemezsiniz.",
    }),
});

export type IncidentForm = z.infer<typeof SIncidentForm>;

export const SIncidentFormEmployee = SIncidentForm.extend({
  employeeName: z.string().min(3, "En az 3 karakter olmalıdır"),
  affectedPerson: z.string().min(3, "En az 3 karakter olmalıdır"),
});

export type IncidentFormEmployee = z.infer<typeof SIncidentFormEmployee>;

export const SIncidentFormPatient = SIncidentForm.extend({
  name: z.string(),
  bornDate: z.string(),
  patientNum: z.string(),
  phoneNum: z.string(),
  isSecondaryVictim: z.enum(["true", "false"]),
  secondaryVictimName: z.string().min(3, "En az 3 karakter olmalıdır"),
});

export type IncidentFormPatient = z.infer<typeof SIncidentFormPatient>;

export const SIncidentFormFilter = z.object({
  protocolNum: z
    .string()
    .min(11, "Protokol numarası en az 10 karakter olmalıdır"),
});

export type IncidentFormFilter = z.infer<typeof SIncidentFormFilter>;
