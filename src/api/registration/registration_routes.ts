import type { Request, Response } from "express";
import express, { type Router } from "express";
import { GetAllUserService, RegisterNewUserService } from "./registration_service";

const RegistrationRouter: Router = express.Router();

const GetAllRegisterUser = async (req: Request, res: Response) => {
  try {
    const data = await GetAllUserService();
    res.status(200).json({ message: "Get domain not implemented yet", data });
  } catch (error) {
    res.status(401).json({ error: error?.toString() });
  }
};

const CreateNewUser = async (req: Request, res: Response) => {
  try {
    const savedUser = await RegisterNewUserService(req.body);
    res.status(200).json({
      message: "User registered successfully",
      user: { ...savedUser },
    });
  } catch (error) {
    res.status(400).json({ error: error?.toString() });
  }
};

const UpdateRegisteredUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Update domain not implemented yet" });
  } catch (error) {
    res.status(401).json({ error: error?.toString() });
  }
};

const DeleteUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Delete domain not implemented yet" });
  } catch (error) {
    res.status(401).json({ error: error?.toString() });
  }
};

RegistrationRouter.get("/", GetAllRegisterUser);
RegistrationRouter.post("/", CreateNewUser);
RegistrationRouter.put("/", UpdateRegisteredUser);
RegistrationRouter.delete("/", DeleteUser);

export default RegistrationRouter;
