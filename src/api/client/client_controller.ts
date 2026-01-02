import type { Request, Response } from "express";
import RoleService from "./client_service";

const ClientController = async (req: Request, res: Response) => {
  console.log("ClientController called");
  const result = await RoleService();
  try {
    res.status(200).json({ ...result });
  } catch (error) {
    res.status(401).json({ ...result, error });
  }
};

export default ClientController;
