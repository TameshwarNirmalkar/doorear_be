import type { Request, Response } from "express";
import TanentService from "./tanent_service";

const TanentController = async (req: Request, res: Response) => {
  console.log("TanentController called");
  const result = await TanentService();
  try {
    res.status(200).json({ ...result });
  } catch (error) {
    res.status(401).json({ ...result, error });
  }
};

export default TanentController;
