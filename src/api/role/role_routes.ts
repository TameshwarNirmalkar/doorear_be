import type { Request, Response } from "express";
import express, { type Router } from "express";
import { AddNewRoleService, GetAllRolesService } from "./role_service";

const RolesRouter: Router = express.Router();

const GetAllRoles = async (req: Request, res: Response) => {
  try {
    const data = await GetAllRolesService();
    res.status(200).json({ message: "Get domain not implemented yet", data });
  } catch (error) {
    res.status(401).json({ error: error?.toString() });
  }
};

const CreateNewRole = async (req: Request, res: Response) => {
  try {
    const savedRole = await AddNewRoleService(req.body);
    res.status(200).json({
      message: "Role registered successfully",
      role: { ...savedRole },
    });
  } catch (error) {
    res.status(400).json({ error: error?.toString() });
  }
};

const UpdateRegisteredRole = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Update domain not implemented yet" });
  } catch (error) {
    res.status(401).json({ error: error?.toString() });
  }
};

const DeleteRole = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Delete domain not implemented yet" });
  } catch (error) {
    res.status(401).json({ error: error?.toString() });
  }
};

RolesRouter.get("/", GetAllRoles);
RolesRouter.post("/", CreateNewRole);
RolesRouter.put("/", UpdateRegisteredRole);
RolesRouter.delete("/", DeleteRole);

export default RolesRouter;
