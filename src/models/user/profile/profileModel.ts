import { z } from "zod";
import { SResponseModel } from "@/models/api/response";
export const SProfileModal = z.object({
  userId: z.number().int(),
  registeryNo: z.number().int(),
  nameSurname: z.string(),
  username: z.string(),
  locationName: z.string(),
  departmentName: z.string(),
  titleName: z.string(),
  jobName: z.string(),
  roleName: z.string(),
  mail: z.string().email(),
  phoneNumber: z.string(),
  pathProfileImg: z.string(),
  profileImg: z.string(),
});

// Profil modelinin TypeScript tipi
export type ProfileModel = z.infer<typeof SProfileModal>;

export const SResponseProfileModal = SResponseModel.extend({
  data: SProfileModal,
});

export type ResponseProfileModel = z.infer<typeof SResponseProfileModal>;
