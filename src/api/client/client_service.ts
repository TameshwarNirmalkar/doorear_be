import PoolConnectionInstance from "@common/config/mysqlDBConnectionPool";

import type { RowDataPacket } from "mysql2";

const ClientService = async () => {
  try {
    const [result] = await PoolConnectionInstance.query<RowDataPacket[]>(`SELECT * FROM clients`);

    return { success: true, message: "Successful fetch clients", data: result };
  } catch (error) {
    return {
      success: false,
      message: `Client List Unsuccessful ${error}`,
      data: null,
    };
  }
};

export default ClientService;
