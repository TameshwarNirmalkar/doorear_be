import PinoLogger from "@utils/logger/pino_logger";
import type { NextFunction, Request, Response } from "express";

const UI_DOMAIN = process.env.UI_DOMAIN;
const unhandeledError = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err) {
    PinoLogger.error(`Unhandeled Error :  ${JSON.stringify(err)}`);
    next();
  }
  return res.redirect(`${UI_DOMAIN}/not-found`);
};

export default unhandeledError;
