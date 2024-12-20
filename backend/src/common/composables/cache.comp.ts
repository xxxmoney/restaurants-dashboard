import {Context} from "hono";

export function useCache(context: Context, cacheKey: string, expirationTtl: number = 60) {
    const kv = context.env.KV_CACHE;

    async function get(): Promise<any> {
        console.info('Getting cache value for key: ', cacheKey);

        const jsonValue = await kv.get(cacheKey);
        const value = jsonValue ? JSON.parse(jsonValue) : undefined;

        console.info('Cache value for key: ', cacheKey, ' is: ', value);

        return value;
    }
    async function set(value: any): Promise<void> {
        if (value === undefined || value === null) {
            console.warn('Trying to cache undefined or null value for key: ', cacheKey);
            return;
        }

        const jsonValue = JSON.stringify(value);
        console.info('Caching value: ', jsonValue, ' for key: ', cacheKey);
        await kv.put(cacheKey, jsonValue, {expirationTtl});
    }

    return {get, set};
}

export function useEndpointCache(context: Context, expirationTtl: number = 60) {
    const cacheKey = context.req.url;
    return useCache(context, cacheKey, expirationTtl);
}