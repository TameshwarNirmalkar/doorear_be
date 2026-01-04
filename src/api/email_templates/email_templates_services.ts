import CreateDynamicDataSource from "@common/config/DataSourceConnectionDynamically";
import { EmailTemplateEntity } from "@entities/doorear/EmailTemplate";

const GetEmailTemplateRepository = async () => {
  const ds = await CreateDynamicDataSource("testDoorear");
  return ds.getRepository(EmailTemplateEntity);
};

export const GetAllTemplatesService = async (): Promise<{ data: EmailTemplateEntity[]; total_count: number }> => {
  try {
    const emailTemplateRepository = await GetEmailTemplateRepository();
    const [data, total_count] = await emailTemplateRepository.findAndCount();
    if (data.length === 0) {
      throw new Error("Template does not exists");
    }
    return { data, total_count };
  } catch (error) {
    throw new Error(`Error in get templates: ${error as Error}.message`);
  }
};

export const GetTemplatesByNotifcationTypeService = async (notification_type: string): Promise<EmailTemplateEntity> => {
  try {
    const emailTemplateRepository = await GetEmailTemplateRepository();
    const template = await emailTemplateRepository.findOne({
      where: { notification_type },
    });
    if (template === null) {
      throw new Error("Template does not exists");
    }
    return template;
  } catch (error) {
    throw new Error(`Error in get templates: ${error as Error}.message`);
  }
};

export const CreateNewTemplateService = async (templateData: Partial<EmailTemplateEntity>): Promise<EmailTemplateEntity> => {
  try {
    const emailTemplateRepository = await GetEmailTemplateRepository();
    // 1. Create a new instance
    const newTemplate = emailTemplateRepository.create(templateData);
    // 2. Logic (e.g., check if email exists)
    const existingUser = await emailTemplateRepository.findOneBy({ notification_type: newTemplate.notification_type });
    if (existingUser) {
      throw new Error("Template type already exists");
    }
    return await emailTemplateRepository.save(newTemplate);
  } catch (error) {
    throw new Error(`Error in template creation: ${error as Error}.message`);
  }
};
