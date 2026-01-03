import PoolDBInstance from "@common/config/MysqlDBConnectionPool";
import type { RowDataPacket } from "mysql2";
import speakeasy from "speakeasy";

const GenerateSecret = async (dbName: string, emailAddress: string) => {
  try {
    const secret = speakeasy.generateSecret({ name: emailAddress });
    const updateSQLSecret = `UPDATE ${dbName}.c_clientuserdetail SET totpSecret = ? WHERE emailAddress = ?`;
    await PoolDBInstance.query<RowDataPacket[]>(updateSQLSecret, [secret.ascii, emailAddress]);

    const secretOtp = speakeasy.totp({
      secret: secret.ascii,
      encoding: "ascii",
      step: 600,
    });

    return secretOtp;
  } catch (err) {
    throw new Error(`GenerateSecret Function ERROR ::: ${err}`);
  }
};

export default GenerateSecret;
