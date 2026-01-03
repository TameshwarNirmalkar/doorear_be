// import PoolConnectionInstance from "@common/config/DataSourceConnectionDynamically";
// import SendEmail from "@common/send_email/sendmail";

import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

class ForgetPassword {
  public PostForgetPassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { clientId, emailaddress } = req.body;
    try {
      res.status(StatusCodes.OK).json({
        success: false,
        data: [{ clientId, emailaddress }],
        message: "Password changed successful",
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid client id or email id",
        error,
      });
    }
  };
}

export const ForgetPasswordController = new ForgetPassword();
