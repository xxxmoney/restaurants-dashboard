import {MenuService} from "./menu.types";
import {DATE_FORMAT, IS_DEBUG} from "../../../../../shared/constants/common.constants";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {inline} from "../../helpers/stringUtils.helper";
import {arrayBufferToBase64} from "../../helpers/buffer.helper";
import {GeminiService} from "../gemini.service";
import format from "string-format";
import {MENU_PROMPTS} from "../../constants/gemini.constants";
import {Menus} from "../../dto/menu";
import {menusSchema} from "../../schemas/menu.schema";

export class KamykMenuService implements MenuService {
    private readonly env: any;
    private readonly fetcher?: Fetcher;

    constructor(env: any, fetcher?: Fetcher) {
        this.env = env;
        this.fetcher = fetcher;
    }

    async getMenus() {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.KAMYK);

        const $link = $('a.elementor-button-link').first();
        this.logDebug(`Got menus link: ${inline($link.html())}`);

        const imageUrl = $link.attr('href');
        this.logDebug(`Got menu image Url: ${imageUrl}`);

        if (!imageUrl) {
            this.logDebug('No menu image Url found');
            return [];
        }

        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBase64 = arrayBufferToBase64(imageBuffer);
        this.logDebug(`Got menu image as base64: ${imageBase64}`);

        // Parse menus with gemini service
        const service = new GeminiService(this.env.GEMINI_KEY);
        const prompt = format(MENU_PROMPTS[restaurantEnum.CINKY_LINKY], DATE_FORMAT);
        const geminiResponse = await service.imageToJson<Menus>(prompt, menusSchema, {base64: imageBase64});
        return geminiResponse.json.menus;
    }

    private logDebug(message: string) {
        if (IS_DEBUG) {
            console.info('KamykMenuService', message);
        }
    }

}
