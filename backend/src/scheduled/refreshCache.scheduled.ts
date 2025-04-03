import {restaurantEnum} from "../../../shared/enums/restaurant.enum";
import {MenuProcessor} from "../common/services/menuProcessor.service";
import {useMenuCache} from "../common/composables/cache.comp";
import {IS_DEBUG} from "../../../shared/constants/common.constants";
import {MenuProviderService} from "../common/services/menuProvider.service";
import {getFetcher} from "../common/helpers/fetcher.helper";
import {Context} from "hono";

export async function handleRefreshCache(c: Context): Promise<void> {
    const errors: Error[] = [];

    if (IS_DEBUG) {
        console.info('Starting cache refresh job');
    }

    // Refresh cache for all restaurant menus
    const refreshCachePromises = Object.values(restaurantEnum).map(async key => {
        try {
            // Clear cache
            const menuService = MenuProviderService.getMenuService(key, c.env, getFetcher(c));
            const menus = await menuService.getMenus();

            await MenuProcessor.getProcessedMenu(key, c.env, menus);
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
