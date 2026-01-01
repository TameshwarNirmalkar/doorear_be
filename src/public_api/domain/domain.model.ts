import { createApiResponse } from "@apiDocs/openAPIResponseBuilders";
import {
    extendZodWithOpenApi,
    OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

extendZodWithOpenApi(z);

export const DomainSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    domain_list: z.array(z.object({ appconfigValue: z.string() })),
});

export type DomainType = z.infer<typeof DomainSchema>;

export const domainRegistry = new OpenAPIRegistry();
domainRegistry.register("Domain", DomainSchema);
domainRegistry.registerPath({
    method: "get",
    path: `/${process.env.API_PARAM}/api/v2/getdomain`,
    tags: ["Domain"],
    responses: createApiResponse(
        z.object(DomainSchema.shape),
        "Success",
        StatusCodes.OK
    ),
});
