import PoolDBInstance from "@common/config/mysqlDBConnectionPool";
import type { RowDataPacket } from "mysql2";
import SendEmail from "../send_email/sendmail";

const SendOtpService = async (firstName: string, emailAddress: string, totp: string) => {
  try {
    const sql = `SELECT * FROM emailtemplate WHERE NotificationType=?`;
    const row = await PoolDBInstance.query<RowDataPacket[]>(sql, ["TOTP"]);

    const currentDateTime = new Date().toUTCString().replace("GMT", "UTC");
    const { EmailBody, EmailSubject } = row[0][0];
    const EmailTemplate = EmailBody.replace("<<firstName>>", `${firstName}${firstName ? "!" : ""}`)
      .replace("<<totp>>", totp)
      .replace("<<time>>", currentDateTime);

    await SendEmail({ to_email: emailAddress, subject: EmailSubject, body: EmailTemplate, cc_email: undefined });

    return row[0][0];
  } catch (error) {
    throw new Error(`SendOtpService Error :: ${error}`);
  }
};

export default SendOtpService;
