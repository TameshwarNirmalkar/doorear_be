import type { NextFunction, Request, Response } from "express";

// interface CrmTypeRequest extends Request {
//     crmtype?: string;
// }

const CheckCrmTypes = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const crmtype = req.params.crmtype;
    if (["sfdc", "hubspot", "msdynamics"].includes(crmtype)) {
        next();
    } else {
        res.status(401).json({ message: "Access denied" });
    }
};

export default CheckCrmTypes;
