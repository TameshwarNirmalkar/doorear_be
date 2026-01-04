// import DomainController from "@api/domain/domain_controller";

import express, { type Router } from "express";
import ClientController from "./client/client_controller";
import EmailTemplatesRouter from "./email_templates/email_templates_routes";
import RegistrationRouter from "./registration/registration_routes";
import RolesRouter from "./role/role_routes";
import TanentController from "./tanent/tanent_controller";

const privateRouter: Router = express.Router();

// Referral Domain URL
// privateRouter.use("/setup/referral/domain", DomainController);
privateRouter.use("/roles", RolesRouter);
privateRouter.use("/clients", ClientController);
privateRouter.use("/tanents", TanentController);
privateRouter.use("/registration", RegistrationRouter);
privateRouter.use("/email_templates", EmailTemplatesRouter);

export default privateRouter;
