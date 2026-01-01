import { createApiResponse } from "@apiDocs/openAPIResponseBuilders";
import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const ForgetPasswrordSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ForgetPasswordT = z.infer<typeof ForgetPasswrordSchema>;

export const ForgetPasswordParamsSchema = z.object({
  body: z.object({
    // clientId: z
    //     .number({ required_error: "Client Id is required." })
    //     .int("Client Id must be a number."),
    emailaddress: z.string({ required_error: "Email Address is required." }).email("Email Address must be a valid email."),
  }),
});

export const forgetPasswordRegistry = new OpenAPIRegistry();
forgetPasswordRegistry.register("Forget Password", ForgetPasswordParamsSchema);
forgetPasswordRegistry.registerPath({
  method: "post",
  path: `/${process.env.API_PARAM}/api/v2/fogetpassword`,
  tags: ["Forget Password"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ForgetPasswordParamsSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.object(ForgetPasswrordSchema.shape), "Success"),
});
