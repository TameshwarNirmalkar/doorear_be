import CreateDynamicDataSource, { DestroyDynamicDataSource } from "@common/config/DataSourceConnectionDynamically";
import { RolesEntity } from "@entities/doorear/Roles";

const GetRoleRepository = async () => {
  const ds = await CreateDynamicDataSource("testDoorear");
  return ds.getRepository(RolesEntity);
};

const GetAllRolesService = async (): Promise<{ data: RolesEntity[]; total_count: number }> => {
  try {
    const roleRepository = await GetRoleRepository();
    const [data, total_count] = await roleRepository.findAndCount();
    if (data.length === 0) {
      throw new Error("Role does not exists");
    }
    return { data, total_count };
  } catch (error) {
    throw new Error(`Error in get registration: ${error as Error}.message`);
  } finally {
    await DestroyDynamicDataSource(`testDoorear`);
  }
};

const AddNewRoleService = async (roles: Partial<{ role_name: string }>): Promise<RolesEntity> => {
  try {
    const roleRepository = await GetRoleRepository();
    // 1. Create a new instance
    const newRole = roleRepository.create(roles);
    // 2. Logic (e.g., check if email exists)
    const existingRole = await roleRepository.findOneBy({ role_name: newRole.role_name });
    if (existingRole) {
      throw new Error("Role Name already exists");
    }
    return await roleRepository.save(newRole);
  } catch (error) {
    throw new Error(`Error in role creation: ${error as Error}.message`);
  } finally {
    await DestroyDynamicDataSource(`testDoorear`);
  }
};

export { GetAllRolesService, AddNewRoleService };
