import PinoLogger from "@common/utils/logger/pino_logger";
import * as dotenv from "dotenv";
import { Pool, type PoolOptions } from "pg";

dotenv.config({ override: true, path: "./.env" });

const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASS } = process.env;
// 2. Define the base configuration
const PgDBConnectionConfig: PoolOptions = {
  host: String(DB_HOST),
  port: Number(DB_PORT), // Parse port number from string to integer
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  max: 10, // maximum number of clients in the pool
  maxUses: 7500, // number of times a client can be reused
  allowExitOnIdle: true,
  maxLifetimeSeconds: 300,
  idleTimeoutMillis: 30000,
  log: (messages) => console.log(messages),
  ssl: {
    rejectUnauthorized: false,
  },
};

PinoLogger.warn(`PostgreSQL connection pool initialized with the following configuration: ${JSON.stringify(PgDBConnectionConfig, null, 2)}`);

// Create the connection pool
const PgConnectionPool = new Pool(PgDBConnectionConfig);

// Note: mysql2/promise Pool does not emit "error" events.
// Error handling should be done where you acquire connections or execute queries.
PgConnectionPool.on("release", (connection) => {
  console.log("Connection released back to pool", connection.name);
});

PgConnectionPool.on("acquire", (connection) => {
  console.log("Connection acquire pool", connection.eventNames());
});

PgConnectionPool.on("error", (connection) => {
  console.log("Connection pool", connection.name);
});

export default PgConnectionPool;
