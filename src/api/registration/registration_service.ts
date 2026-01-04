// registration.service.ts
import CreateDynamicDataSource from "@common/config/DataSourceConnectionDynamically";
import { ClientSignUpEntity } from "@entities/doorear/Registration";

const AppDataSource = await CreateDynamicDataSource("testDoorear");
const registrationRepository = AppDataSource.getRepository(ClientSignUpEntity);

const GetAllUserService = async (): Promise<{ data: ClientSignUpEntity[]; total_count: number }> => {
  try {
    const userList = await registrationRepository.findAndCount();
    if (userList[0].length === 0) {
      throw new Error("User does not exists");
    }
    return { data: userList[0], total_count: userList[1] };
  } catch (error) {
    throw new Error(`Error in get registration: ${error as Error}.message`);
  }
};

const RegisterNewUserService = async (userData: Partial<{ full_name: string; email: string; phone: number; db_created: number }>): Promise<ClientSignUpEntity> => {
  try {
    // 1. Create a new instance
    const newUser = registrationRepository.create(userData);
    // 2. Logic (e.g., check if email exists)
    const existingUser = await registrationRepository.findOneBy({ email: newUser.email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    return await registrationRepository.save(newUser);
  } catch (error) {
    throw new Error(`Error in registration: ${error as Error}.message`);
  }
};

export { GetAllUserService, RegisterNewUserService };
