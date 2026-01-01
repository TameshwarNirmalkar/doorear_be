import * as dotenv from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";

dotenv.config({ override: true, path: "./.env" });

// 1. Define the cache map outside the factory function
const DataSourcesCache = new Map<string, DataSource>();

// 2. Define the base configuration
const BaseConnectionOptions: Partial<DataSourceOptions> = {
  type: "mysql",
  host: process.env.HOST || "localhost",
  port: process.env.DB_PORT || 3306, // Parse port number from string to integer
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin123",
  // Do NOT include the 'database' here
  synchronize: false,
  logging: ["query", "error"],
  entities: ["src/entity/**/*.ts"],
  migrations: [],
  subscribers: [],
  multipleStatements: true,
  cache: true,
  enableQueryTimeout: true,
  trace: true,
};

// 3. Factory function to create a new DataSource dynamically
const CreateDynamicDataSource = async (databaseName: string): Promise<DataSource> => {
  // 4. Check the cache first. If found AND initialized, return the cached instance.
  const cachedDataSource = DataSourcesCache.get(databaseName);
  if (cachedDataSource?.isInitialized) {
    console.log(`[Cache Hit] Reusing connection for database: ${databaseName}`);
    return cachedDataSource;
  }

  const options: DataSourceOptions = {
    ...BaseConnectionOptions,
    database: databaseName, // <-- Set the dynamic DB name here
    name: databaseName, // Use the DB name as the connection/DataSource name
  } as DataSourceOptions;

  const dataSource = new DataSource(options);

  // Initialize the connection
  await dataSource
    .initialize()
    .then(() => console.log(`[Success] DataSource for ${databaseName} initialized.`))
    .catch((error) => {
      console.error(`[Error] Failed to initialize connection for ${databaseName}:`, error);
      throw error;
    });

  // Recommended: Cache the connection pool for re-use in a real application
  // 5. Cache the connection pool for re-use
  DataSourcesCache.set(databaseName, dataSource);
  // and handle closing connections when they are no longer needed (dataSource.destroy()).

  return dataSource;
};

/**
 * Safely destroys a cached data source connection pool and removes it from the cache.
 * @param databaseName The name of the database to destroy the connection for.
 */
export const DestroyDynamicDataSource = async (databaseName: string): Promise<void> => {
  const dataSource = DataSourcesCache.get(databaseName);

  if (dataSource) {
    if (dataSource.isInitialized) {
      console.log(`[Destroy] Closing connection for database: ${databaseName}`);
      await dataSource.destroy();
    }
    DataSourcesCache.delete(databaseName);
    console.log(`[Destroy] Connection removed from cache: ${databaseName}`);
  } else {
    console.warn(`[Destroy] Connection not found in cache: ${databaseName}`);
  }
};

export { DataSourcesCache };

export default CreateDynamicDataSource;
