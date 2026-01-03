import CreateDynamicDataSource, { DestroyDynamicDataSource } from "@common/config/DataSourceConnectionDynamically";
import PBKDFunction from "@common/services/password_based_key_derivation_function";
import SelectCilentDataBaseDetails from "@common/services/select_database";
import { decrypt } from "@common/utils/encrypt_decrypt";
import { GenerateGenericJWTToken } from "@common/utils/generate_jwt_token";
import ClientUserDetailEntity from "entities/client/C_ClientDetailEntity";

import type { Request, Response } from "express";
// import type { RowDataPacket } from "mysql2";
import { z } from "zod";

type LoginCredentialsI = {
  clientId: number;
  emailaddress: string;
  password: string;
  deviceid: string;
  timeStamp: string;
};

// Schema
const createUserSchema = z.object({
  client_id: z.number({ required_error: "Client Id is required" }),
  email_address: z.string({ required_error: "Email is required" }).email("Valid email format"),
  password: z.string({ required_error: "Password is required" }),
  device_id: z.string({ required_error: "Device Id is required" }),
});

const AuthenticateController = async (req: Request<LoginCredentialsI>, res: Response) => {
  const parseResult = createUserSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ success: false, message: parseResult.error.errors });
  }

  const { email_address, client_id, password } = parseResult.data;
  const DataSourceDynamically = await CreateDynamicDataSource(`client_${client_id}`);

  const ClientUserDetailRepo = DataSourceDynamically.getRepository(ClientUserDetailEntity);

  // const encyPass = decrypt(password);
  const decryptPassword = decrypt(password) as string;
  console.log(" decryptPassword ========== ", decryptPassword);
  const timeStamp = decryptPassword.substring(decryptPassword.length - 14);
  const passwordString = decryptPassword.substring(0, decryptPassword.length - 14);

  try {
    const { DbName } = await SelectCilentDataBaseDetails(client_id);

    // const [loggedInUser] = await PoolDBInstance.query<RowDataPacket[]>(
    //     `call ${DbName}.uspLoginProc(?,?,?)`,
    //     [emailaddress, "CHECK", timeStamp]
    // );
    const loggedInUser = await DataSourceDynamically.query(`CALL ${DbName}.uspLoginProc(?,?,?)`, [email_address, "CHECK", timeStamp]);

    const { checked, salt, iterations } = loggedInUser[0][0];
    if (!checked) {
      return res.status(400).json({
        success: false,
        message: "Invalid username and Password",
      });
    }

    // console.log(DbName, "================== ", loggedInUser, "\n\n");

    const isPBKDFRes = await PBKDFunction(passwordString, salt, +iterations, 32, "sha256");

    console.log("token = ", isPBKDFRes);

    // const [loginClient] = await PoolDBInstance.query<RowDataPacket[]>(`call ${DbName}.uspClientLoginProc(?, ?, ?)`, [email_address, isPBKDFRes.derivedKey, client_id]);
    // const {
    //   // deviceDetail,
    //   message,
    //   full_name
    //   role,
    //   firstName,
    //   lastName,
    //   isMaintenance,
    //   isSSOEnable,
    //   crmtype,
    //   emailAddress,
    //   profilePicture,
    // } = loginClient[0][0];

    // if (!loginClient.length) {
    //   return res.json({
    //     status: 200,
    //     success: false,
    //     data: null,
    //     message,
    //     isblocked,
    //   });
    // }

    // const deviceEntry: { loginTime: string; deviceId: string } = {
    //     loginTime: "",
    //     deviceId: "",
    // };
    // if (JSON.parse(deviceDetail)?.length) {
    // for (let i = 0; i < deviceDetail?.length; i++) {
    //     const currDevice = JSON.parse(deviceDetail)[i];
    //     if (currDevice.deviceId === deviceId) {
    //         currDevice.lastLoginTime = new Date();
    //         deviceEntry.loginTime = new Date().toDateString();
    //         deviceEntry.deviceId = deviceId;
    //         break;
    //     }
    // }
    // }
    // const arrayOfDevice = JSON.stringify(deviceDetail);
    // await PoolDBInstance.query<RowDataPacket[]>(
    //     `UPDATE ${DbName}.c_clientuserdetail c SET c.deviceDetail = ? WHERE c.emailAddress= ?`,
    //     [arrayOfDevice, emailaddress]
    // );
    // const _currDeviceTime = deviceEntry.loginTime
    //     ? new Date(deviceEntry.loginTime)
    //     : null;
    const generateToken = GenerateGenericJWTToken({
      client_id,
      email_address,
    });
    // await PoolDBInstance.query<RowDataPacket[]>(
    //     `call ${DbName}.uspUpdateTokenForClient(?,?,?,?)`,
    //     [clientUserId, generateToken, emailaddress, "UPDATE"]
    // );

    await ClientUserDetailRepo.createQueryBuilder()
      .update()
      .set({
        token: generateToken,
        device_detail: [].toString(),
      })
      .where({ client_id, email_address })
      .execute();

    // const [tokenResult] = await PoolDBInstance.query<RowDataPacket[]>(
    //     `SELECT token FROM ${DbName}.c_clientuserdetail;`
    // );
    // const tokenRes = await ClientUserDetailRepo.findOne({
    //     select: {
    //         token: true,
    //     },
    //     where: { clientId: clientId },
    // });
    // console.log(" ======= ", generateToken);

    const successResponse = {
      success: true,
      message: "Valid user",
      token: generateToken,
      account: client_id,
      full_name: "",
      picture: "",
      image: "",
      sub: "--",
      client_id,
      email_address,
      verifyotp: false,
    };

    // req.session.sessionUserDetail = {
    //     clientId,
    //     clientUserId,
    //     emailAddress,
    // };
    res.status(200).json(successResponse);
  } catch (error) {
    console.log("Error Client DB selected = ", error);
    res.status(404).json({
      success: false,
      message: "Invalid username and password",
      data: "",
    });
  } finally {
    await DestroyDynamicDataSource(`client_${client_id}`);
  }
};

export default AuthenticateController;
