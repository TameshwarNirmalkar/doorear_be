// import { ClientSignInController } from "@api/auth/client_signin/client_sign_controller";
// import { ClientSignupSchema } from "@api/auth/client_signin/client_sign_schema";
// import { emailVerificationSchema } from "@api/auth/email_otp_schema";
// import { EmailVerificationController } from "@api/auth/email_verification_controller";
import AuthenticateController from "@api/auth/login/authenticate_controller";
import LoginController from "@api/auth/login/login_controller";
import { LoginSchema, SetPasswordAdminSchema } from "@api/auth/login/login_schema";
import SetPasswordAdminController from "@api/auth/login/set_password_admin";
import LogoutController from "@api/auth/logout/LogoutController";
// import ResendOtpByEmailController from "@api/auth/resend_otp/resend_otp_by_email.controller";
// import ResendOtpController from "@api/auth/resend_otp/resend_otp_controller";
// import {
//     ResendOtpByEmailSchema,
//     ResendOtpSchema,
// } from "@api/auth/resend_otp/resend_otp_schema";
// import CrmListController from "@api/crm_list/crm_list_controller";
// import IpsDomainController from "@api/ips_domain/ips_domain_controller";
// import { SetPasswordStatusController } from "@api/set_password_status/set_password_controller";
// import { SetPasswordSchema } from "@api/set_password_status/set_password_schema";
// import VerifyOtpController from "@api/verify_otp/verify_otp_controller";
// import VerifyTokenController from "@api/verify_token/verify_token_controller";
// import { TokenSchema } from "@api/verify_token/verify_token_schema";
// import { CheckPermission } from "@common/middleware/openfga_authorizaton";
import { ValidateRequest } from "@common/utils/httpHandlers";
import express, { type Router } from "express";

//

const authRouter: Router = express.Router();

// Controllers
// import checkdomainController from '../controller/checkdomain';

// import verifyTokenController from '../arosys-api/arosys-models/lib/controllers/validateEmailToken';
// import checkPermission from '../middleware/openfgaMiddleware';

// Routes
// authRouter.post("/clientsignup", ValidateRequest(ClientSignupSchema), ClientSignInController);

// authRouter.post("/emailverification", ValidateRequest(emailVerificationSchema), EmailVerificationController);

authRouter.post("/setpasswordadmin", ValidateRequest(SetPasswordAdminSchema), SetPasswordAdminController);
// authRouter.post("/setpasswordstatus", ValidateRequest(SetPasswordSchema), SetPasswordStatusController.setPasswordStatus);

authRouter.post("/activesession", ValidateRequest(LoginSchema), LoginController);

authRouter.post("/authenticate", AuthenticateController);

authRouter.post("/logout", LogoutController);

// authRouter.post("/resendotp", ValidateRequest(ResendOtpSchema), ResendOtpController);
// authRouter.post("/sendotpregistration", ValidateRequest(ResendOtpByEmailSchema), ResendOtpByEmailController);

// authRouter.get("/validatetoken", ValidateRequest(TokenSchema), VerifyTokenController);

// authRouter.get("/crmlists", CrmListController);
// authRouter.post("/verifyotp", VerifyOtpController);
// authRouter.get("/ispdomains", IpsDomainController);

// authRouter.post(
//   "/checkdomain",
//   checkdomainController.checkdomain as express.RequestHandler,
//   (_req: Request, res: Response) => {
//     // #swagger.ignore = true
//     res.end();
//   }
// );

// authRouter.get(
//   "/verifytoken",
//   verifyTokenController.validateEmailToken as express.RequestHandler,
//   (_req: Request, res: Response) => {
//     // #swagger.ignore = true
//     res.end();
//   }
// );

export default authRouter;
