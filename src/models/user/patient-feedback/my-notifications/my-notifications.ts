import { z } from "zod";

export const SPatientFeedback = z.object({
  reportId: z.number().nonnegative(),
  status: z.string().nonempty(),
  reportType: z.string().nonempty(),
  reporterName: z.string().nonempty(),
  assignedDepartment: z.string().optional(),
  reportDate: z.string(),
  completionDate: z.string().nullable(),
});

export const patientFeedbackDummyData = {
  reportId: 202,
  status: "Completed",
  reportType: "Administrative",
  reporterName: "Mehmet Öztürk",
  assignedDepartment: "Finance",
  reportDate: "2024-11-20",
  completionDate: "2024-12-01",
};

export type PatientFeedbackModel = z.infer<typeof SPatientFeedback>;
