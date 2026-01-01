// import DomainController from "@api/domain/domain_controller";

import express, { type Router } from "express";
import RoleController from "./role/role_controller";

const privateRouter: Router = express.Router();

// Referral Domain URL
// privateRouter.use("/setup/referral/domain", DomainController);
privateRouter.use("/roles", RoleController);

export default privateRouter;
