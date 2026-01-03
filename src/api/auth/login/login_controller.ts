import type { Record } from "@common/global_types/generic_types";
import type { Request, Response } from "express";

type LoginI = {
  client_id: number;
  email_address: string;
};

type RequestParams = Record<string, never>;
type ResBody = Record<string, never>;

const LoginController = async (req: Request<RequestParams, ResBody, LoginI>, res: Response): Promise<void> => {
  console.info("\n\nLogin Controller call.");
  console.info(req.body, "\n\n");
  const { client_id, email_address } = req.body;

  try {
    // const requestedValue = ["", 0, "SELECT_DB", emailaddress, clientId];
    // Select the database of the login client
    // const { DbName } = await SelectCilentDataBaseDetails(client_id);

    // Add Client timestamp

    console.log("Login User = ", client_id, email_address);

    res.json({
      status: 200,
      success: true,
      message: "New session started successfully",
      time_stamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log("Error Client DB selected = ", error);
    res.json({
      status: 404,
      success: false,
      message: "Invalid email or password or client id",
      data: "",
    });
  }
};

export default LoginController;
