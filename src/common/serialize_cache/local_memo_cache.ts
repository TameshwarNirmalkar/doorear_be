import fs from "node:fs/promises";
import path from "node:path";

/**
 * Defines the type for the user data to be cached.
 * This ensures that the data structure is consistent.
 */
export interface TokenDataT {
  token: string;
  email: string;
  otp: number;
  full_name: string;
}

export interface OtpDataI {
  otp: number;
}

const cacheDir = "./src/common/serialize_cache/cache";

/**
 * Retrieves cached data from a file.
 * @param key The unique key for the cached data.
 * @returns The parsed data or null if a cache miss or an error occurs.
 */
export const GetCachedData = async <T>(key: string): Promise<T | string> => {
  const filePath = path.join(cacheDir, `${key}.json`);

  try {
    const fileContent: string = await fs.readFile(filePath, "utf-8");
    console.log(`Cache hit for key: ${key}`);
    const parsedFile = JSON.parse(fileContent) as T;
    return parsedFile;
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      return `Cache miss for key: ${key}::: ${error}`;
    } else {
      return `Failed to read cache file for key "${key} ::: ${error}"`;
    }
  }
};

/**
 * Stores data in a file cache.
 * @param key The unique key for the cached data.
 * @param data The data to be cached.
 */
export const SetCachedData = async <T>(key: string, data: T): Promise<boolean> => {
  const filePath = path.join(cacheDir, `${key}.json`);
  const jsonString: string = JSON.stringify(data);

  try {
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(filePath, jsonString, "utf-8");
    console.log(`Cache set for key: ${key}`);
    return true;
  } catch (error) {
    console.error(`Failed to write cache file for key "${key}":`, error);
    return false;
  }
};

/**
 * Clears the entire file cache by removing the cache directory.
 * @returns A promise that resolves when the cache is cleared.
 */
export const ClearCache = async (
  key: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const filePath = path.join(cacheDir, `${key}.json`);
    // fs.rm is a more robust way to remove directories recursively
    await fs.rm(filePath, { recursive: true, force: true });

    return {
      success: true,
      message: "Cache directory cleared successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to clear cache directory. ${error}`,
    };
  }
};

// Example Usage
export const FetchCachedData = async <T>(fileKey: string): Promise<T> => {
  // Try to get data from cache first
  const cachedToken = (await GetCachedData<T>(`${fileKey}`)) as T;

  // If not in cache, fetch from source (simulated)
  if (cachedToken) {
    return cachedToken as T;
  }

  // Store the fetched data in the cache using the value
  await SetCachedData(`${fileKey}`, cachedToken);

  // Return the value
  return cachedToken;
};

// Run the example
// (async () => {
// console.log("--- First call: fetching and caching ---");
// await fetchUser(123);

// console.log("\n--- Second call: getting from cache ---");
// await fetchUser(123);

// console.log("\n--- Third call: fetching and caching a new user ---");
// await fetchUser(456);
// })();
