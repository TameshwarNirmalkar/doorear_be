import { z } from "zod";

export const ForgetPasswordSchema = z.object({
  body: z.object({
    client_id: z.number(),
    email_address: z.string({ required_error: "Email is required" }).email("Email must be a valid email address"),
  }),
});

export type ForgetPasswordBody = z.infer<typeof ForgetPasswordSchema>;
