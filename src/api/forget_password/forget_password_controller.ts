import type { Request, Response } from "express";
import ForgetPasswordtService from "./forget_password_service";

const ForgetPasswordtController = async (req: Request, res: Response) => {
  const { client_id, email_address } = req.body;
  const result = await ForgetPasswordtService({ client_id, email_address });
  try {
    res.status(200).json({ ...result });
  } catch (error) {
    res.status(401).json({ ...result, error });
  }
};

export default ForgetPasswordtController;
