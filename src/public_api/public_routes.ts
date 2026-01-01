import LogoutController from "@api/auth/logout/LogoutController";
// import ForgetPasswordtController from "@api/forget_password/forget_password_controller";
// import { ForgetPasswordSchema } from "@api/forget_password/forget_password_schema";
import { ValidateRequest } from "@common/utils/httpHandlers";
import { ForgetPasswordController } from "@publicApi/forget_password/forget_password_controller";
import express, { type Router } from "express";
import { DomainController } from "./domain/domain_controller";
import { ForgetPasswordParamsSchema } from "./forget_password/forget_password_model";

const publicRouter: Router = express.Router();

publicRouter.post("/forgetpassword", ValidateRequest(ForgetPasswordParamsSchema), ForgetPasswordController.PostForgetPassword);
// publicRouter.post(
//     "/forget_password",
//     ValidateRequest(ForgetPasswordSchema),
//     ForgetPasswordtController
// );
publicRouter.get("/getdomain", DomainController.getDomainList);

publicRouter.get("/logout", LogoutController);

export default publicRouter;
