import "reflect-metadata";
import * as fs from "node:fs";
import https from "node:https";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "@common/utils/envConfig";
import PinoLogger from "@common/utils/logger/pino_logger";

import { app } from "./server";

const { NODE_ENV, HOST, PORT, API_PARAM } = env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const server = app.listen(env.PORT, () => {
//   PinoLogger.info(`========= Environment: ${env.NODE_ENV}`);

//   PinoLogger.info(
//     `\n\nServer (${NODE_ENV}) running on port http://${HOST}:${PORT}/${API_PARAM}/api/v2`
//   );
// });

const credentials = {
  key: fs.readFileSync(path.resolve(__dirname, "./common/certificate/127.0.0.1+1-key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "./common/certificate/127.0.0.1+1.pem")),
};

const server = https.createServer(credentials, app).listen(PORT, HOST, 3001, () => {
  PinoLogger.info(`\n\nServer ✔ (${NODE_ENV}) running on port https://${HOST}:${PORT}/${API_PARAM}`);
});

const onCloseSignal = () => {
  PinoLogger.info("Sigint Received, Shutting Down");
  server.close(() => {
    PinoLogger.info("Server Closed, Successfully");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
process.on("unhandledRejection", async (reason, promise) => {
  const catchRejection = await promise;
  PinoLogger.fatal(`unhandledRejection Rejection at: ${catchRejection}, reason: ${reason}`);
  // Application specific logging, error reporting, etc.
  // Optionally exit the process after logging: process.exit(1);
});
process.on("uncaughtException", (reason, promise) => {
  PinoLogger.fatal(`uncaughtException Rejection at: ${promise}, reason: ${reason.message}`);
  // Application specific logging, error reporting, etc.
  // Optionally exit the process after logging: process.exit(1);
});
