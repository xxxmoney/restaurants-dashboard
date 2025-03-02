import {CategorizedMenus, Menu, Menus} from "../dto/menu";
import {GeminiService} from "./gemini.service";
import {MENU_CATEGORIZATION_PROMPT} from "../constants/gemini.constants";
import {categorizedMenusSchema} from "../schemas/menu.schema";

export const MenuCategorizer = {
    async categorizeMenus(menus: Menus, env: any): Promise<CategorizedMenus> {
        // There are no menus, do not categorize
        if (menus.menus.length === 0) {
            return {categorizedMenus: []};
        }

        const service = new GeminiService(env.GEMINI_KEY);
        const geminiResponse = await service.jsonToJson<Menus, CategorizedMenus>(MENU_CATEGORIZATION_PROMPT, categorizedMenusSchema, menus);

        return geminiResponse.json;
    }
}
