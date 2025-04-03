import {CategorizedMenu, Menu} from "../dto/menu";
import {DateTime} from "luxon";
import {MenuCategorizer} from "./menuCategorizer.service";
import {useMenuCache} from "../composables/cache.comp";

export const MenuProcessor = {
    async getProcessedMenu(enumValue: number, env: any, menus: Menu[]): Promise<CategorizedMenu[]> {
        try {
            const cache = useMenuCache(env, enumValue);

            // Get cached
            const cachedMenus = await cache.get();

            // Compare menus and decide if there was a change
            let cacheDiffers = false;
            if (cachedMenus && cachedMenus.length > 0) {
                const menusSerialized = JSON.stringify(menus);
                const cachedMenusSerialized = JSON.stringify(cachedMenus);

                // Compare serialized menus
                cacheDiffers = menusSerialized !== cachedMenusSerialized;
            }

            // Hotfix - set year of all menus to current year
            menus.forEach(menu => {
                menu.date = menu.date.set({year: DateTime.now().year});
            });
            // Order menus by date descending
            menus.sort((a, b) => a.date.toMillis() - b.date.toMillis());

            // Apply menu categorization
            const {categorizedMenus} = await MenuCategorizer.categorizeMenus({menus: menus}, env);

            // If cache differs, set menus to cache
            if (cacheDiffers) {
                await cache.set(categorizedMenus);
            }

            return categorizedMenus;
        }
        catch (e) {
            throw new Error(`Error processing restaurant menu '${enumValue}': \n ${e}`);
        }
    }
}
