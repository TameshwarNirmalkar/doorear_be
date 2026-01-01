import * as fs from "node:fs/promises";
import PinoLogger from "./logger/pino_logger";

const ReadSqlFileModern = async (filePath: string, clientId: string): Promise<string> => {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    return fileContent.replace(/client_1000/g, `client_${clientId}`);
  } catch (error) {
    console.error(`Error reading the file at ${filePath}:`, error);
    PinoLogger.info(`ReadFile Sync ERROR ================ ${error}`);
    throw error;
  }
};

export default ReadSqlFileModern;
