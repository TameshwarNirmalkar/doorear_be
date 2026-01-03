// import PoolDBInstance from "@common/config/MysqlDBConnectionPool";
// import type { RowDataPacket } from "mysql2";

const SelectCilentDataBaseDetails = async (client_id: number) => {
  if (client_id !== 0) {
    try {
      return Promise.resolve({ DbName: `client_${client_id}` });
    } catch (error) {
      throw new Error(`Error in DB selection :: ${error}`);
    }
  } else {
    return { DbName: "doorear" };
  }
};

export default SelectCilentDataBaseDetails;
