import CreateDynamicDataSource from "@common/config/DataSourceConnectionDynamically";
import { EmailTemplateEntity } from "@entities/doorear/EmailTemplate";
import SendEmail from "../send_email/sendmail";

const GetEmailTemplateRepository = async () => {
  const ds = await CreateDynamicDataSource("testDoorear");
  return ds.getRepository(EmailTemplateEntity);
};

const SendOtpService = async (full_name: string, email_address: string, otp: string) => {
  try {
    const emailTemplateRepository = await GetEmailTemplateRepository();
    const template = await emailTemplateRepository.findOne({
      where: { notification_type: "OTP" },
    });
    if (!template) {
      throw new Error("Template does not exists");
    }

    const { email_body, email_subject, default_message } = template;
    const currentDateTime = new Date().toUTCString().replace("GMT", "UTC");
    const emailBody = email_body
      ?.replace("<<firstName>>", `${full_name}${full_name ? "!" : ""}`)
      .replace("<<totp>>", otp)
      .replace("<<time>>", currentDateTime);

    await SendEmail({ to_email: email_address, subject: email_subject || "", body: emailBody || "" });

    return { success: true, message: default_message || "OTP sent successfully", status: 200 };
  } catch (error) {
    throw new Error(`SendOtpService Error :: ${error}`);
  }
};

export default SendOtpService;
