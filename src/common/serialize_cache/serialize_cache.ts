import { LRUCache } from "lru-cache";

interface CacheValue {
  /* describe the shape of your cached values here */
  [key: string]: string | number | boolean | object | null;
}

export const cache = new LRUCache<string, CacheValue>({
  maxSize: 300 * 1024 * 1024, // 300 MB
  sizeCalculation: (value: CacheValue) =>
    Buffer.byteLength(JSON.stringify(value), "utf8"),
});
