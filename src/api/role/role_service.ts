import PgConnectionPool from "@common/config/PgDBConnectionString";

import type { QueryResult } from "pg";

const RoleService = async () => {
  try {
    const result = await PgConnectionPool.query<QueryResult>(`SELECT * FROM roles`);
    console.log(`Roles fetched successfully: ${JSON.stringify(result)}`);
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
