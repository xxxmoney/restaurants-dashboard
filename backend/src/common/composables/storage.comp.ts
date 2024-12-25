import {Context} from "hono";

export function useStorage(context: Context, storageKey: string) {
    const kv = context.env.KV_STORAGE;

    async function get<T>(): Promise<T> {
        console.info('Getting storage value for key: ', storageKey);

        const value = await kv.get(storageKey);
        console.info('Storage value for key: ', storageKey, ' is: ', value);

        return value;
    }

    async function set<T>(value: T): Promise<void> {
        console.info('Storing value: ', value, ' for key: ', storageKey);
        await kv.put(storageKey, value);
    }

    return {get, set};
}