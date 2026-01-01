import { randomBytes } from "node:crypto";
// import VerifyRecaptcha from "@api/auth/verify_captcha_service";
import PoolDBInstance from "@common/config/mysqlDBConnectionPool";
import PBKDFunction from "@common/services/password_based_key_derivation_function";
import SelectCilentDataBaseDetails from "@common/services/select_database";
import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2";

type SetPasswordDomainI = {
  new_password: string;
  reset_pwd_link: string;
};

const SetPasswordAdminController = async (req: Request<SetPasswordDomainI>, res: Response) => {
  const { new_password, reset_pwd_link } = req.body;

  try {
    // Step 1 - Verify Captcha
    const isVerified = { valid: true }; // VerifyRecaptcha(recapchaKey, false);
    if (isVerified.valid) {
      const salt = randomBytes(16).toString("hex"); // generate a random salt
      const iterations = 10000;
      const keylen = 32;
      const digest = "sha256";

      const isPBKDFRes = await PBKDFunction(new_password, salt, iterations, keylen, digest);
      if (reset_pwd_link.lastIndexOf("@") === -1) {
        const isChangePassword = await PoolDBInstance.query<RowDataPacket[]>("call vyakar.uspResetPasswordAdmin(?,?)", [reset_pwd_link, new_password]);
        const { Success, Message, EmailAddress } = isChangePassword[0][0][0];
        if (!Success) {
          res.status(404).json({
            success: false,
            message: "Error in Operation, Unable to set the password",
            data: "",
          });
        } else {
          res.status(404).json({
            success: Success,
            message: Message,
            emailaddress: EmailAddress,
          });
        }
      } else {
        const client_id = reset_pwd_link.substr(reset_pwd_link.lastIndexOf("@") + 1, reset_pwd_link.length);
        // const { DbName } = await SelectCilentDataBaseDetails(clientId);

        const [isPasswordUpdated] = await PoolDBInstance.query<RowDataPacket[]>(`call client_${client_id}.uspResetPasswordAdmin(?,?,?,?)`, [reset_pwd_link, isPBKDFRes.derivedKey, salt, iterations]);

        const { Success, Message, EmailAddress } = isPasswordUpdated[0][0];

        // if (!Success) {
        //     res.status(404).json({
        //         success: false,
        //         message:
        //             "Error in Operation, Unable to set the password",
        //         data: "",
        //     });
        // } else {
        //     res.status(200).json({
        //         success: Success,
        //         message: Message,
        //         emailaddress: EmailAddress,
        //     });
        // }
        res.status(200).json({
          success: Success,
          message: Message,
          emailaddress: EmailAddress,
        });
      }
    }
  } catch (error) {
    console.log("Error Client DB selected = ", error);
    res.status(404).json({
      success: false,
      message: `Error in ${error}`,
      data: "",
      error,
    });
  }
};

export default SetPasswordAdminController;
