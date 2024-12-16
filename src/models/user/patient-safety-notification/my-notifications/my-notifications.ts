import { z } from "zod";

export const SMyNotifications = z.object({
  reportId: z.number().nonnegative(),
  status: z.string(),
  reportType: z.string(),
  reporterName: z.string(),
  protocolId: z.number().nonnegative().nullable(),
  eventLocation: z.string(),
  eventDate: z.string(),
  completionDate: z.string(),
});

export const exampleDataMyNotifications = {
  reportId: 123,
  status: "Open",
  reportType: "Technical",
  reporterName: "John Doe",
  protocolId: 456,
  eventLocation: "Main Office",
  eventDate: new Date().toDateString(),
  completionDate: new Date().toDateString(),
};

export type MyNotifications = z.infer<typeof SMyNotifications>;

export const patientSafetyDummyData: MyNotifications[] = [
  {
    reportId: 123,
    status: "Open",
    reportType: "Genel",
    reporterName: "John Doe",
    protocolId: null,
    eventLocation: "Main Office",
    eventDate: new Date().toDateString(),
    completionDate: new Date().toDateString(),
  },
  {
    reportId: 124,
    status: "Closed",
    reportType: "Hasta",
    reporterName: "Jane Smith",
    protocolId: 789,
    eventLocation: "Headquarters",
    eventDate: new Date().toDateString(),
    completionDate: new Date().toDateString(),
  },
];
