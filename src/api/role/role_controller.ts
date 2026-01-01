import type { Request, Response } from "express";
import RoleService from "./role_service";

const RoleController = async (req: Request, res: Response) => {
  console.log("RoleController called");
  const result = await RoleService();
  try {
    res.status(200).json({ ...result });
  } catch (error) {
    res.status(401).json({ ...result, error });
  }
};

export default RoleController;
