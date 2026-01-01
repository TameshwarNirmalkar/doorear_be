import PinoLogger from "@common/utils/logger/pino_logger";
import * as dotenv from "dotenv";
import type { PoolOptions } from "mysql2";
import * as mysql from "mysql2";

// Load environment variables from .env file
dotenv.config({ override: true, path: "./src/.env" });

// Define a type for the connection pool configuration
const poolConfig: PoolOptions = {
  host: process.env.HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin123", // Make sure to provide a strong password or use a secrets manager
  database: process.env.DB_NAME || "doorear",
  port: process.env.DB_PORT || 3306, // Parse port number from string to integer
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // Maximum number of idle connections
  idleTimeout: 60000, // Idle connection timeout in milliseconds (1 minute)
  queueLimit: 0, // Unlimited queueing for connection requests
  connectTimeout: 3000,
};
PinoLogger.warn(`MySQL connection pool initialized with the following configuration: ${JSON.stringify(poolConfig, null, 2)}`);

// Create the connection pool
const PoolInstance = mysql.createPool(poolConfig);

// Note: mysql2/promise Pool does not emit "error" events.
// Error handling should be done where you acquire connections or execute queries.
PoolInstance.on("release", (connection) => {
  console.log("Connection released back to pool", connection.threadId);
});

PoolInstance.on("acquire", (connection) => {
  console.log("Connection acquire pool", connection.threadId);
});

PoolInstance.on("connection", (connection) => {
  console.log("Connection pool", connection.threadId);
});

export { PoolInstance };
export default PoolInstance.promise();
