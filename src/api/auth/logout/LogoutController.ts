import type { Request, Response } from "express";

import type { RequestParams } from "nodemailer/lib/xoauth2";

const LogoutController = async (req: Request<RequestParams>, res: Response): Promise<void> => {
  try {
    res.json({
      status: 200,
      success: true,
      message: "New session started successfully",
    });
  } catch (error) {
    res.json({
      status: 404,
      success: false,
      message: "Invalid email or password or client id",
    });
  }
};

export default LogoutController;
