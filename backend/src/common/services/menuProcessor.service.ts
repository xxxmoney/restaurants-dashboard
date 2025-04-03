import {CategorizedMenu, Menu} from "../dto/menu";
import {DateTime} from "luxon";
import {MenuCategorizer} from "./menuCategorizer.service";
import {useMenuCache} from "../composables/cache.comp";
import {MenuProviderService} from "./menuProvider.service";
import {getFetcher} from "../helpers/fetcher.helper";

export const MenuProcessor = {
    async getProcessedMenusWithCache(env: any, enumValue: number): Promise<CategorizedMenu[]> {
        const cache = useMenuCache(env, enumValue);
        const cachedMenus = await cache.get();

        if (cachedMenus) {
            return cachedMenus.processedMenus;
        }

        const menus = await MenuProviderService.getMenuService(enumValue, env, getFetcher(env)).getMenus();
        const processedMenus = await this.getProcessedMenus(env, enumValue, menus);
        await cache.set({ processedMenus: processedMenus, menus: menus });

        return processedMenus;
    },

    async getProcessedMenus(env: any, enumValue: number, menus: Menu[]): Promise<CategorizedMenu[]> {
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
