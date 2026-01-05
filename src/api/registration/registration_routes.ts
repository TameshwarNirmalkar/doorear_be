import SendOtpService from "@common/services/send_otp_service";
import { generateSpeakEasyOtp } from "@common/utils/utilityMethods";
import type { Request, Response } from "express";
import express, { type Router } from "express";
import { DeleteRegisterUserService, GetAllUserService, RegisterNewUserService } from "./registration_service";

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
    const otp = generateSpeakEasyOtp(process.env.OTP_SECRET_KEY || "");
    console.log("Generated OTP:", otp);
    await SendOtpService(savedUser.full_name, savedUser.email, otp);
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
    const { id } = req.params as unknown as { id: number };
    await DeleteRegisterUserService(id);
    res.status(200).json({ success: true, message: "Delete user executed successfully" });
  } catch (error) {
    res.status(401).json({ success: false, error: error?.toString() });
  }
};

RegistrationRouter.get("/", GetAllRegisterUser);
RegistrationRouter.post("/", CreateNewUser);
RegistrationRouter.put("/", UpdateRegisteredUser);
RegistrationRouter.delete("/:id", DeleteUser);

export default RegistrationRouter;
