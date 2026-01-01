import PoolConnectionInstance from "@common/config/mysqlDBConnectionPool";

import type { RowDataPacket } from "mysql2";

const RoleService = async () => {
  try {
    // 1. check has DB or not
    const [result] = await PoolConnectionInstance.query<RowDataPacket[]>(`SELECT * FROM roles`);
    // 2. Check in procedure has user or not
    // const row = await PoolConnectionInstance.query<RowDataPacket[]>(`query`, [email_address, client_id]);
    return { success: true, message: "Successful fetch roles", data: result[0] };
  } catch (error) {
    return {
      success: false,
      message: `Roles List Unsuccessful ${error}`,
      data: null,
    };
  }
};

export default RoleService;
