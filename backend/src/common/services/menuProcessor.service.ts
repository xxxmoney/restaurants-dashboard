import {CategorizedMenu, Menu} from "../dto/menu";
import {DateTime} from "luxon";
import {MenuCategorizer} from "./menuCategorizer.service";
import {useMenuCache} from "../composables/cache.comp";
import {MenuProviderService} from "./menuProvider.service";
import {getFetcher} from "../helpers/fetcher.helper";
import {Context} from "hono";

export const MenuProcessor = {
    async getProcessedMenusWithCache(enumValue: number, c: Context): Promise<CategorizedMenu[]> {
        const cache = useMenuCache(c.env, enumValue);
        const cachedMenus = await cache.get();

        if (cachedMenus) {
            return cachedMenus.processedMenus;
        }

        const menus = await MenuProviderService.getMenuService(enumValue, c.env, getFetcher(c)).getMenus();
        const processedMenus = await this.getProcessedMenus(enumValue, c.env, menus);
        await cache.set({ processedMenus: processedMenus, menus: menus });

        return processedMenus;
    },

    async getProcessedMenus(enumValue: number, env: any, menus: Menu[]): Promise<CategorizedMenu[]> {
        try {
            // Hotfix - set year of all menus to current year
            menus.forEach(menu => {
                menu.date = menu.date.set({year: DateTime.now().year});
            });
            // Order menus by date descending
            menus.sort((a, b) => a.date.toMillis() - b.date.toMillis());

            // Apply menu categorization
            const {categorizedMenus} = await MenuCategorizer.categorizeMenus({menus: menus}, env);

            return categorizedMenus;
        }
        catch (e) {
            throw new Error(`Error processing restaurant menu '${enumValue}': \n ${e}`);
        }
    }
}
