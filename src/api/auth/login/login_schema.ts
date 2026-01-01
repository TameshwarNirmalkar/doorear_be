import { PASSWORD_REGEX } from "@common/utils/reg_ex";
import { z } from "zod";

export const LoginSchema = z.object({
  body: z.object({
    client_id: z.number().positive("Client id is required"),
    email_address: z.string({ required_error: "Email is required" }).email("Email must be a valid email address"),
  }),
});

export type LoginBody = z.infer<typeof LoginSchema>;

export const SetPasswordAdminSchema = z.object({
  body: z.object({
    newpassword: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be between 8 and 48 characters")
      .max(48, "Password must be between 8 and 48 characters")
      .regex(PASSWORD_REGEX, "Password must contain at least lowercase letter, uppercase letter, number, and special character."),
  }),
});
export type SetPasswordAdminBody = z.infer<typeof SetPasswordAdminSchema>;
