import PoolConnectionInstance from "@common/config/mysqlDBConnectionPool";

import type { RowDataPacket } from "mysql2";

const RoleService = async () => {
  try {
    const [result] = await PoolConnectionInstance.query<RowDataPacket[]>(`SELECT * FROM roles`);
    return { success: true, message: "Successful fetch roles", data: result };
  } catch (error) {
    return {
      success: false,
      message: `Roles List Unsuccessful ${error}`,
      data: null,
    };
  }
};

export default RoleService;
