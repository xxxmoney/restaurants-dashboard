import {CheerioAPI} from "cheerio";
import {MenuService} from "./menu.types"
import {Menu, Menus} from "../../dto/menu";
import {DateTime} from "luxon";
import {arrayBufferToBase64} from "../../helpers/buffer.helper";
import {GeminiService} from "../gemini.service";
import format from "string-format";
import {MENU_PROMPTS} from "../../constants/gemini.constants";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {DATE_FORMAT, IS_DEBUG} from "../../../../../shared/constants/common.constants";
import {menusSchema} from "../../schemas/menu.schema";
import {RESTAURANTS} from "../../../../../shared/constants/restaurant.constants";

export class CinkyLinkyMenuService implements MenuService {
    private readonly env: any;

    constructor(env: any) {
        this.env = env;
    }

    async getMenus(): Promise<Menu[]> {
        // @ts-ignore
        const webUrl = RESTAURANTS[restaurantEnum.CINKY_LINKY].url;

        // Url for menu image is in defined format, so we can construct it
        const date = DateTime.now();
        const workWeekStartDate = date.startOf('week');
        const workWeekEndDate = workWeekStartDate.plus({days: 4});

        const workWeekStartDateMonth = workWeekStartDate.toFormat('M');
        const workWeekEndDateMonth = workWeekEndDate.toFormat('M');

        // Suffix the start date with the month if the month is different for start and end date of week
        const workWeekStartDateSuffix = workWeekStartDateMonth !== workWeekEndDateMonth ? ('_' + workWeekStartDate.toFormat('M')) : '';
        const workWeekEndDateSuffix = '_' + workWeekEndDateMonth;
        const workWeekStartDateFormatted = workWeekStartDate.toFormat('d') + workWeekStartDateSuffix;
        const workWeekEndDateFormatted = workWeekEndDate.toFormat('d') + workWeekEndDateSuffix;
        const imageUrl = `${webUrl}/wp-content/uploads/${date.toFormat('yyyy')}/${workWeekStartDate.toFormat('MM')}/poledni-menu-${workWeekStartDateFormatted}-${workWeekEndDateFormatted}-${date.toFormat('yyyy')}-scaled.jpg`;
        if (IS_DEBUG) {
            console.info(`Cinky Linky menu image URL: ${imageUrl}`);
        }
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBase64 = arrayBufferToBase64(imageBuffer);

        // Get menus with gemini service
        const service = new GeminiService(this.env.GEMINI_KEY);
        const prompt = format(MENU_PROMPTS[restaurantEnum.CINKY_LINKY], workWeekStartDate.toFormat(DATE_FORMAT), workWeekEndDate.toFormat(DATE_FORMAT), DATE_FORMAT);
        const geminiResponse = await service.imageToJson<Menus>(prompt, menusSchema, {base64: imageBase64});
        return geminiResponse.json.menus;
    }
}
