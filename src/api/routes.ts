// import DomainController from "@api/domain/domain_controller";

import express, { type Router } from "express";
import ClientController from "./client/client_controller";
import RoleController from "./role/role_controller";
import TanentController from "./tanent/tanent_controller";

const privateRouter: Router = express.Router();

// Referral Domain URL
// privateRouter.use("/setup/referral/domain", DomainController);
privateRouter.use("/roles", RoleController);
privateRouter.use("/clients", ClientController);
privateRouter.use("/tanents", TanentController);

export default privateRouter;
