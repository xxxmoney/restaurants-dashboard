import {Context} from "hono";
import {IS_DEBUG} from "../../../../shared/constants/common.constants";
import {CategorizedMenu} from "../dto/menu";
import {MENU_CACHE_EXPIRATION, MENU_CACHE_KEY} from "../constants/cache.constants";

export function useCache<T>(env: any, cacheKey: string, expirationTtl: number) {
    const kv = env.KV_CACHE;

    async function get(): Promise<T | undefined> {
        if (IS_DEBUG) {
            console.info('Getting cache value for key: ', cacheKey);
        }

        const jsonValue = await kv.get(cacheKey);
        const value = jsonValue ? JSON.parse(jsonValue) as T : undefined;

        if (IS_DEBUG) {
            console.info('Cache value for key: ', cacheKey, ' is: ', value);
        }

        return value;
    }

    async function set(value: T): Promise<void> {
        if (value === undefined || value === null) {
            if (IS_DEBUG) {
                console.warn('Trying to cache undefined or null value for key: ', cacheKey);
            }
            return;
        }

        const jsonValue = JSON.stringify(value);
        if (IS_DEBUG) {
            console.info('Caching value: ', jsonValue, ' for key: ', cacheKey);
        }
        await kv.put(cacheKey, jsonValue, {expirationTtl});
    }

    async function clear(): Promise<void> {
        if (IS_DEBUG) {
            console.info('Clearing cache for key: ', cacheKey);
        }
        await kv.delete(cacheKey);
    }

    return {get, set, clear};
}

export function useEndpointCache<T>(context: Context, expirationTtl: number = 60) {
    const cacheKey = context.req.url;
    return useCache<T>(context.env, cacheKey, expirationTtl);
}

export function useMenuCache(env: any, restaurantEnumValue: number) {
    const cacheKey = `${MENU_CACHE_KEY}-${restaurantEnumValue}`;
    return useCache<CategorizedMenu[]>(env, cacheKey, MENU_CACHE_EXPIRATION);
}