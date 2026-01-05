import type { Request, Response } from "express";
import express, { type Router } from "express";
import { CreateNewTemplateService, GetAllTemplatesService, GetTemplatesByNotifcationTypeService } from "./email_templates_services";

const EmailTemplatesRouter: Router = express.Router();

const GetAllTemaplateLists = async (req: Request, res: Response) => {
  try {
    const data = await GetAllTemplatesService();
    res.status(200).json({ message: "Get all templates", data });
  } catch (error) {
    res.status(401).json({ error: error?.toString() });
  }
};

const CreateNewTemplate = async (req: Request, res: Response) => {
  try {
    const savedTemplate = await CreateNewTemplateService(req.body);
    res.status(200).json({
      message: "Template created successfully",
      template: { ...savedTemplate },
    });
  } catch (error) {
    res.status(400).json({ error: error?.toString() });
  }
};

const GetTemaplateByType = async (req: Request, res: Response) => {
  try {
    const data = await GetTemplatesByNotifcationTypeService(req.params.notification_type);
    res.status(200).json({ message: "Get template by notification type", data });
  } catch (error) {
    res.status(401).json({ error: error?.toString() });
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

EmailTemplatesRouter.get("/", GetAllTemaplateLists);
EmailTemplatesRouter.get("/:notification_type", GetTemaplateByType);
EmailTemplatesRouter.post("/", CreateNewTemplate);
EmailTemplatesRouter.put("/", UpdateRegisteredUser);
EmailTemplatesRouter.delete("/", DeleteUser);

export default EmailTemplatesRouter;
