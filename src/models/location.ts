import { z } from "zod";

export const SLocation = z.object({
  locationId: z.number(),
  locationName: z.string(),
  ldapAddress: z.string(),
});

export type Location = z.infer<typeof SLocation>;
