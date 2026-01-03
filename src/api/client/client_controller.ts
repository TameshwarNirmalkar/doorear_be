import type { Request, Response } from "express";
import ClientService from "./client_service";

const ClientController = async (req: Request, res: Response) => {
  console.log("ClientController called");
  const result = await ClientService();
  console.log("ClientController result:", result);
  try {
    res.status(200).json({ ...result });
  } catch (error) {
    res.status(401).json({ ...result, error });
  }
};

export default ClientController;
