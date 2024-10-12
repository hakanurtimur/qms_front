import { z } from "zod";

export const SLocation = z.object({
  locationId: z.number(),
  locationName: z.string(),
});

export type Location = z.infer<typeof SLocation>;

export const SLocationData = z.object({
  data: z.array(SLocation),
  statusCode: z.number(),
  error: z.string().optional().nullable(),
});

export type LocationData = z.infer<typeof SLocationData>;
