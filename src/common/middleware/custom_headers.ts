import type { NextFunction, Request, Response } from "express";

/**
 * Middleware to set custom response headers.
 * @param {Response} res The Express response object.
 * @param {NextFunction} next The next middleware/route handler.
 */

const headers = new Headers({
    "referrer-policy": "no-referrer-when-downgrade",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "access-control-allow-origin": "http://localhost:3000",
    "access-control-allow-headers": "content-type, authorization",
    "access-control-allow-credentials": "true",
    "cross-origin-resource-policy": "true",
    "cross-origin-opener-policy": "noopener",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "private, no-cache, no-store, must-revalidate",
    Expires: "-1",
    Pragma: "no-cache",
    "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, x-email-id, x-device-id, x-device-token, x-device-type, role, role-region, admin, user-id, type, userid, Pragma, Cache-Control, clientid, emailaddress, auth-token",
    "Content-Security-Policy": "*",
});

const SetCustomHeaders = (req: Request, res: Response, next: NextFunction) => {
    // console.log("Cookies =============> ", req.cookies.authToken);
    /*
    (req: Request, res: Response, next: NextFunction) => {
    res.setHeaders(headers);
    next();
    }
    */
    // Use res.setHeader() for a single header
    // res.setHeader('X-Custom-Header', 'Value-From-Middleware');

    res.setHeaders(headers);
    // IMPORTANT: Call next() to pass control to the next middleware or route handler
    next();
    console.log("REQUEST COOKIE : ==============> ", req.cookies);
    console.log("REQUEST SESSION : ==============> ", req.headers);
};

export default (req: Request, res: Response, next: NextFunction) =>
    SetCustomHeaders(req, res, next);
