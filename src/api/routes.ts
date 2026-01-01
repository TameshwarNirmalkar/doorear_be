// import DomainController from "@api/domain/domain_controller";

import express, { type Router } from "express";

const privateRouter: Router = express.Router();

// Referral Domain URL
// privateRouter.use("/setup/referral/domain", DomainController);

export default privateRouter;
