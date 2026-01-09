import PinoLogger from "@utils/logger/pino_logger";
import * as dotenv from "dotenv";
// import * as nodemailer from "nodemailer";
import * as postmark from "postmark";

dotenv.config({ override: false, path: "./src/.env" });

interface SendMailParams {
  to_email: string;
  subject: string;
  body: string;
  cc_email?: string;
}

const serverToken: string = process.env.POSTMARK_API_KEY || "";
const client = new postmark.ServerClient(serverToken);

const SendEmail = async ({
  to_email,
  subject,
  body,
  cc_email,
}: SendMailParams): Promise<{
  success: boolean;
  message: string;
  status: number;
}> => {
  try {
    const response = await client.sendEmail({
      From: process.env.SMTP_FROM || "", // Must be a verified sender
      To: to_email,
      Subject: `${subject}`,
      HtmlBody: `${body}`,
      TextBody: `${body}`,
      Cc: cc_email,
      MessageStream: "broadcast", // Optional: defaults to "outbound", "broadcast"
    });

    PinoLogger.trace(`Send Email Postmark Request: ${JSON.stringify(response)}`);

    return Promise.resolve({
      success: true,
      message: "Email sent successfully",
      status: 200,
    });
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || "587"),
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    //   debug: true, // show debug output
    //   logger: true, // log information in console
    //   // tls: {
    //   //   ciphers: "SSLv3",
    //   // },
    // });

    // const resTransporter = await transporter.sendMail({
    //   from: `"Doorear" <${process.env.SMTP_FROM}>`,
    //   to: to_email,
    //   cc: cc_email,
    //   subject: subject,
    //   html: body,
    // });
    // PinoLogger.info(`Send Email Transporter Request: ${JSON.stringify(resTransporter)}`);
    // return Promise.resolve({
    //   success: true,
    //   message: "Email sent successfully",
    //   status: 200,
    // });
  } catch (error: unknown) {
    // console.error("Error sending email:", error);
    return Promise.reject({
      success: false,
      message: `Failed to send email ${error}`,
      status: 535,
    });
    // throw new Error("Failed to send email");
  }
};

export default SendEmail;
