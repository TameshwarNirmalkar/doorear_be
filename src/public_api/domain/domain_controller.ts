import PoolConnectionInstance from "@common/config/MysqlDBConnectionPool";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ResultSetHeader } from "mysql2/promise";

class DomainClass {
  public getDomainList: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
    const sqlQuery = `SELECT appconfigValue FROM doorear.appconfig WHERE appConfigType = 'current_domain_link'`;
    const [domain_list] = await PoolConnectionInstance.query<ResultSetHeader>(sqlQuery);
    res.status(StatusCodes.OK).json({
      message: "Success",
      success: true,
      domain_list,
    });
  };
}

export const DomainController = new DomainClass();
