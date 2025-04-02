import {restaurantEnum} from "../../../shared/enums/restaurant.enum";
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {useMenuCache} from "../common/composables/cache.comp";
import {IS_DEBUG} from "../../../shared/constants/common.constants";

export async function handleRefreshCache(env: any): Promise<void> {
    const errors: Error[] = [];

    if (IS_DEBUG) {
        console.info('Starting cache refresh job');
    }

    // Refresh cache for all restaurant menus
    const refreshCachePromises = Object.values(restaurantEnum).map(async key => {
        try {
            // Clear cache
            const cache = useMenuCache(env, key);
            await cache.clear();

            await MenuProcessor.getProcessedMenu(key, env);
            console.info(`Cache refreshed for restaurant: '${key}'`);
        } catch (e) {
            console.error(e);
            errors.push(e instanceof Error ? e : new Error(`${e}`));
        }
    });

    await Promise.all(refreshCachePromises);

    if (IS_DEBUG) {
        console.info(`Finished cache refresh job, success: '${errors.length === 0}'`);
    }

    // Throw on error so the job can be marked as failed
    if (errors.length > 0) {
        throw new AggregateError(errors, `Error refreshing cache for restaurants`);
    }
}
