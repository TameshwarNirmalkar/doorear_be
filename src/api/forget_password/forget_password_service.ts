// import PoolConnectionInstance from "@common/config/MysqlDBConnectionPool";
// import SelectCilentDataBaseDetails from "@common/services/select_database";

// import type { RowDataPacket } from "mysql2";

const ForgetPasswordtService = async (payload: { client_id: string; email_address: string }) => {
  const { client_id, email_address } = payload;
  try {
    // 1. check has DB or not
    // const hasDB = await SelectCilentDataBaseDetails(+client_id);
    // 2. Check in procedure has user or not
    // const row = await PoolConnectionInstance.query<RowDataPacket[]>(`query`, [email_address, client_id]);
    console.log("ForgetPasswordtService called with:", client_id, email_address);
    return { success: true, message: "Link send successful", data: null };
  } catch (error) {
    return {
      success: false,
      message: `CRM List Unsuccessful ${error}`,
      data: null,
    };
  }
};

export default ForgetPasswordtService;
