import PoolConnectionInstance from "@common/config/mysqlDBConnectionPool";

import type { RowDataPacket } from "mysql2";

const TanentService = async () => {
  try {
    // 1. check has DB or not
    const [result] = await PoolConnectionInstance.query<RowDataPacket[]>(`SELECT * FROM tenants`);
    console.log("TanentService result:", result);

    return { success: true, message: "Successful fetch tenants", data: result };
  } catch (error) {
    return {
      success: false,
      message: `Tenant List Unsuccessful ${error}`,
      data: null,
    };
  }
};

export default TanentService;
