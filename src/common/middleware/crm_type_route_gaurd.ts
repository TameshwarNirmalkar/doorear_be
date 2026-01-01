import type { NextFunction, Request, Response } from "express";

// interface CrmTypeRequest extends Request {
//     crmtype?: string;
// }

const CheckCrmTypes = (req: Request, res: Response, next: NextFunction): void => {
  // const crmtype = req.params.crmtype;
  if (true) {
    next();
  } else {
  }
};

export default CheckCrmTypes;
