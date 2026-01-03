import { randomBytes } from "node:crypto";
import PBKDFunction from "@common/services/password_based_key_derivation_function";
import type { Request, Response } from "express";

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
        if (!isPBKDFRes.derivedKey) {
          res.status(404).json({
            success: false,
            message: "Error in Operation, Unable to set the password",
            data: "",
          });
        } else {
          res.status(404).json({
            success: isPBKDFRes.success,
            message: isPBKDFRes.message,
            emailaddress: isPBKDFRes.derivedKey,
          });
        }
      } else {
        const client_id = reset_pwd_link.substr(reset_pwd_link.lastIndexOf("@") + 1, reset_pwd_link.length);

        res.status(200).json({
          success: client_id,
          message: client_id,
          emailaddress: client_id,
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
