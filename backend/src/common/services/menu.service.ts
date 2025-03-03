import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {Menu, MenuItem, Menus} from "../dto/menu";
import {DateTime} from "luxon";
import {GeminiService} from "./gemini.service";
import {arrayBufferToBase64} from "../helpers/buffer.helper";
import {menusSchema} from "../schemas/menu.schema";
import {MENU_PROMPTS} from "../constants/gemini.constants";
import {Cheerio, CheerioAPI} from "cheerio";

function parseDate(text: string) {
    const date = text.match(/\d{1,2}\.\d{1,2}\.\d{4}/g)![0];
    return DateTime.fromFormat(date, 'd.M.yyyy');
}

function parsePrice(text: string) {
    return parseInt(text.match(/\d+/g)![0]);
}

export const MenuService = {
    async getCinkyLinkyMenu(menus: Menu[], env: any) {
        // @ts-ignore
        const webUrl = RESTAURANTS[restaurantEnum.CINKY_LINKY].url;

        // Url for menu image is in defined format, so we can construct it
        const date = DateTime.now();
        const workWeekStartDate = date.startOf('week');
        const workWeekEndDate = workWeekStartDate.plus({days: 4});

        const imageUrl = `${webUrl}/wp-content/uploads/${date.toFormat('yyyy')}/${date.toFormat('MM')}/poledni-menu-${workWeekStartDate.toFormat('d')}-${workWeekEndDate.toFormat('d')}-${date.toFormat('M')}-${date.toFormat('yyyy')}-scaled.jpg`;
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBase64 = arrayBufferToBase64(imageBuffer);

        // Get menus with gemini service
        const service = new GeminiService(env.GEMINI_KEY);
        const geminiResponse = await service.imageToJson<Menus>(MENU_PROMPTS[restaurantEnum.CINKY_LINKY], menusSchema, {base64: imageBase64});
        menus.push(...geminiResponse.json.menus);
    },

    getKlikaMenu($: CheerioAPI, menus: Menu[]) {
        const $content = $('.content').first();
        const $title = $content.find('strong').first();

        const date = parseDate($title.text());

        // Get menu items
        const items = $content.find('table').first().find('tr').has('td').toArray();

        // Select menu items to correct format
        const menuItems = items.map(item => {
            const $item = $(item);
            const name = $item.find('td').first().text().trim();
            const priceText = $item.find('td').last().text().trim();
            // Get number from price using regex
            const price = parsePrice(priceText);

            return {name, price};
        });

        menus.push({date, items: menuItems});
    },

    getBarRedHookMenu($: CheerioAPI, menus: Menu[]) {
        const contents = $('.content').toArray();

        contents.forEach((content) => {
            const $content = $(content);
            const $title = $content.find('h2').first();

            const date = parseDate($title.text());

            const foodItems = $content.find('.food').toArray();
            const priceItems = $content.find('.prize').toArray();

            if (foodItems.length !== priceItems.length) {
                throw new Error('Food and price items count does not match');
            }

            const count = foodItems.length;
            // If count is 1, then there is no menu for that day
            if (count === 1) {
                return;
            }

            const menuItems = foodItems.map((foodItem, index) => {
                const $foodItem = $(foodItem);
                const $priceItem = $(priceItems[index]);

                const name = $foodItem.text().trim();
                const price = parsePrice($priceItem.text());

                return {name, price};
            });

            menus.push({date, items: menuItems});
        })
    },

    getPalatinoMenu($: CheerioAPI, menus: Menu[]) {
        const contents = [$('#pondeli').first(), $('#utery').first(), $('#streda').first(), $('#ctvrtek').first(), $('#patek').first()];

        contents.forEach(($content) => {
            const $title = $content.find('.fr-tab-den').first();

            const date = parseDate($title.text());

            const items = $content.find('.frl-table tr').toArray();

            const menuItems = items.map(item => {
                const $item = $(item);
                const name = $item.find('td').first().contents().first().text().trim();
                const priceText = $item.find('td').last().text().trim();
                const price = parsePrice(priceText);

                return {name, price};
            });

            menus.push({date, items: menuItems});
        })
    },

    getSalandaMenu($: CheerioAPI, menus: Menu[]) {
        const selectorPrefix = '#poledni-menu #priceTable #collapse';
        const blacklistWord = 'TÝDENNÍ STÁLICE';
        const getItem = (dayNumber: number) => $(`${selectorPrefix}${dayNumber}`).first();
        const contents = [getItem(1), getItem(2), getItem(3), getItem(4), getItem(5)];

        contents.forEach(($content, index) => {
            const date = DateTime.now().startOf('week').plus({days: index});

            const items = $content.find('table > tbody > tr').toArray();

            const menuItems = items.map(item => {
                const $item = $(item);
                
                const name = $item.find('td > strong').first().text().trim();
                const priceText = $item.find('td > strong').last().text().trim();

                if (!name || !priceText) {
                    return null;
                }

                const price = parsePrice(priceText);

                return {name, price};
            }).filter(item => item && !item.name.includes(blacklistWord)) as MenuItem[];

            menus.push({date, items: menuItems});
        })
    }


}
