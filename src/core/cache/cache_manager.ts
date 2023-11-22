import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheItem {
  data: any;
  expiry: number | null;
}

class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheItem>;

  private constructor() {
    this.cache = new Map<string, CacheItem>();
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }

    return CacheManager.instance;
  }

  public async get(key: string): Promise<any> {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  public async set(key: string, data: any, expiry?: number): Promise<void> {
    const item: CacheItem = {
      data,
      expiry: expiry ? Date.now() + expiry : null,
    };

    this.cache.set(key, item);

    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error(`Error setting cache item for key ${key}: ${error}`);
    }
  }

  public async remove(key: string): Promise<void> {
    this.cache.delete(key);

    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing cache item for key ${key}: ${error}`);
    }
  }

  public async clear(): Promise<void> {
    this.cache.clear();

    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`Error clearing cache: ${error}`);
    }
  }

  public async load(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      items.forEach(([key, value]) => {
        const item: CacheItem = JSON.parse(value!);

        if (item.expiry && Date.now() > item.expiry) {
          this.cache.delete(key);
          AsyncStorage.removeItem(key);
        } else {
          this.cache.set(key, item);
        }
      });
    } catch (error) {
      console.error(`Error loading cache: ${error}`);
    }
  }
}

export default CacheManager;
