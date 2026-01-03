// import PgConnectionPool from "@common/config/DataSourceConnectionDynamically";

import type { QueryResult } from "pg";

const TanentService = async (): Promise<{ success: boolean; message: string; data: QueryResult[] | null }> => {
  try {
    // 1. check has DB or not
    // const result = await PgConnectionPool.query<QueryResult>(`SELECT * FROM tenants`);
    console.log("TanentService result:", []);

    return { success: true, message: "Successful fetch tenants", data: [] };
  } catch (error) {
    return Promise.reject({
      success: false,
      message: `Tenant List Unsuccessful ${error}`,
      data: null,
    });
  } finally {
    // PgConnectionPool.end();
  }
};

export default TanentService;
