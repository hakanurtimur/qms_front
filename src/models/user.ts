import { z } from "zod";
import { jwtDecode } from "jwt-decode";

const SUser = z
  .object({
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
      z.string(),
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": z.string(),
    TicketName: z.string(),
    TitleId: z.string(),
    JobId: z.string(),
    DepartmentId: z.string(),
    jti: z.string(),
    aud: z.string(),
    nbf: z.number(),
    exp: z.number(),
    iss: z.string(),
  })
  .transform((payload) => ({
    userId:
      payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
    username:
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    TicketName: payload.TicketName,
    TitleId: payload.TitleId,
    JobId: payload.JobId,
    DepartmentId: payload.DepartmentId,
    jti: payload.jti,
    aud: payload.aud,
    nbf: payload.nbf,
    exp: payload.exp,
    iss: payload.iss,
  }));

export type User = z.infer<typeof SUser>;

export function parseJwt(token: string): User {
  const decodedToken = jwtDecode(token);

  return SUser.parse(decodedToken);
}
