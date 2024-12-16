import { z } from "zod";

export const SPatientSecuritySheetSchema = z.object({
  reportId: z.string(),
  reportType: z.string(),
  reporterName: z.string(),
  protocolId: z.string(),
  patientAge: z.string(),
  patientFullName: z.string(),
  doctorBranch: z.string(),
  doctorName: z.string(),
  service: z.string(),
  secondaryVictimName: z.string().optional(),
  eventLocation: z.string(),
  eventDate: z.string(),
  status: z.string(),
  completionDate: z.string(),
  description: z.string(),
});

export const dummyPatientSecuritySheetData = {
  reportId: "12345",
  reportType: "Hasta Güvenliği",
  reporterName: "Dr. John Doe",
  protocolId: "P-67890",
  patientAge: "45",
  patientFullName: "Jane Doe",
  doctorBranch: "Kardiyoloji",
  doctorName: "Dr. Smith",
  service: "YBÜ",
  secondaryVictimName: "Sebo Dayı",
  eventLocation: "Servis 3",
  eventDate: "2024-06-15",
  status: "Açık",
  completionDate: "2024-06-20",
  description: "Test açıklaması",
};

export type PatientSecuritySheetModel = z.infer<
  typeof SPatientSecuritySheetSchema
>;
