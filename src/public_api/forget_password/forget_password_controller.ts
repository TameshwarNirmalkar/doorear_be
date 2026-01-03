import PoolConnectionInstance from "@common/config/MysqlDBConnectionPool";
import SendEmail from "@common/send_email/sendmail";
import SelectCilentDataBaseDetails from "@common/services/select_database";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

class ForgetPassword {
  public PostForgetPassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { clientId, emailaddress } = req.body;
    try {
      if (clientId > 0) {
        const { DbName } = await SelectCilentDataBaseDetails(clientId);
        const sqlQuery = `UPDATE ${DbName}.c_clientuserdetail SET forgetPasswordCount = CASE WHEN(forgetPasswordFailedDateTime IS NULL OR TIMESTAMPDIFF(HOUR, forgetPasswordFailedDateTime, NOW()) >= 1) THEN 1 WHEN forgetPasswordCount < 3 THEN forgetPasswordCount + 1 ELSE 3 END, forgetPasswordFailedDateTime = CASE WHEN forgetPasswordCount = 1 THEN NOW() ELSE forgetPasswordFailedDateTime END WHERE emailAddress = TRIM(?)`;

        const [effectedClientRows] = await PoolConnectionInstance.query<ResultSetHeader>(sqlQuery, [emailaddress]);

        const { affectedRows } = effectedClientRows;
        if (affectedRows > 0) {
          const [clientPasswordRes] = await PoolConnectionInstance.query<RowDataPacket[]>(`call ${DbName}.new_uspForgotPassword(?,?)`, [emailaddress, clientId]);
          const { EmailBody, EmailSubject, Success } = clientPasswordRes[0][0];

          await SendEmail({
            to_email: emailaddress,
            subject: EmailSubject,
            body: EmailBody,
          });
          res.status(StatusCodes.OK).json({
            success: Success,
            data: Success ? [] : null,
            isforgetexceed: false,
            message: `Password link send to your register email address`,
          });
        } else {
          res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `Failed to send the link.`,
            data: [],
          });
        }
      } else {
        await PoolConnectionInstance.query<ResultSetHeader>("call uspForgotPasswordAdmin(?,?)", [emailaddress, clientId]);

        res.status(StatusCodes.OK).json({
          success: false,
          data: [],
          message: "Password changed successful",
        });
      }
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid client id or email id",
        error,
      });
    }
  };
}

export const ForgetPasswordController = new ForgetPassword();
