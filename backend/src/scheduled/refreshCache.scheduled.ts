import {restaurantEnum} from "../../../shared/enums/restaurant.enum";
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {useMenuCache} from "../common/composables/cache.comp";

export async function handleRefreshCache(env: any): Promise<void> {
    const errors: Error[] = [];

    // Refresh cache for all restaurant menus
    const refreshCachePromises = Object.values(restaurantEnum).map(async key => {
        try {
            // Clear cache
            const cache = useMenuCache(env, key);
            await cache.clear();

            await MenuProcessor.getProcessedMenu(key, env);
            console.info(`Cache refreshed for restaurant: '${key}'`);
        } catch (e) {
            const message = `Error refreshing cache for restaurant: '${key}': '${e}'`;

            console.error(message);
            errors.push(new Error(message));
        }
    });

    await Promise.all(refreshCachePromises);

    // Throw on error so the job can be marked as failed
    if (errors.length > 0) {
        throw new AggregateError(errors, `Error refreshing cache for restaurants`);
    }
}
