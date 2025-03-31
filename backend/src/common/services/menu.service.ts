import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {Menu, MenuItem, Menus} from "../dto/menu";
import {DateTime} from "luxon";
import {GeminiService} from "./gemini.service";
import {arrayBufferToBase64} from "../helpers/buffer.helper";
import {menusSchema} from "../schemas/menu.schema";
import {MENU_PROMPTS} from "../constants/gemini.constants";
import {CheerioAPI} from "cheerio";
import format from "string-format";
import {DATE_FORMAT} from "../../../../shared/constants/common.constants";
import {parsePdf} from "../helpers/pdfParser.helper";
import {array} from "yup";

function parseDate(text: string) {
    const date = text.match(/\d{1,2}\.\d{1,2}\.\d{4}/g)![0];
    return DateTime.fromFormat(date, 'd.M.yyyy');
}

function parsePrice(text: string) {
    const match = text.match(/\d+/g);

    return match ? parseInt(match[0]) : -1;
}

export const MenuService = {
    async getCinkyLinkyMenu(menus: Menu[], env: any) {
        // @ts-ignore
        const webUrl = RESTAURANTS[restaurantEnum.CINKY_LINKY].url;

        // Url for menu image is in defined format, so we can construct it
        const date = DateTime.now();
        const workWeekStartDate = date.startOf('week');
        const workWeekEndDate = workWeekStartDate.plus({days: 4});

        const imageUrl = `${webUrl}/wp-content/uploads/${date.toFormat('yyyy')}/${date.toFormat('MM')}/poledni-menu-${workWeekStartDate.toFormat('d')}_${workWeekStartDate.toFormat('M')}-${workWeekEndDate.toFormat('d')}_${workWeekEndDate.toFormat('M')}-${date.toFormat('yyyy')}-scaled.jpg`;
        console.log(imageUrl);
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBase64 = arrayBufferToBase64(imageBuffer);

        // Get menus with gemini service
        const service = new GeminiService(env.GEMINI_KEY);
        const prompt = format(MENU_PROMPTS[restaurantEnum.CINKY_LINKY], workWeekStartDate.toFormat(DATE_FORMAT), workWeekEndDate.toFormat(DATE_FORMAT), DATE_FORMAT);
        const geminiResponse = await service.imageToJson<Menus>(prompt, menusSchema, {base64: imageBase64});
        menus.push(...geminiResponse.json.menus);
    },

    getKlikaMenu($: CheerioAPI, menus: Menu[]) {
        const $content = $('.content').first();
        const $title = $content.find('strong').first();

        const menuDate = parseDate($title.text());

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

        // Include all days of work week
        const wekkStartDate = menuDate.startOf('week');
        for (let i = 0; i < 5; i++) {
            const date = wekkStartDate.plus({days: i});

            menus.push({
                date: date,
                // Only fot menu items for one day, so if date is not same as menu date, items are empty
                items: date.equals(menuDate) ? menuItems : []
            });
        }
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

        const weekStartDate = DateTime.now().startOf('week');
        contents.forEach(($content, index) => {
            const date = weekStartDate.plus({days: index});

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

            menus.push({date: date, items: menuItems});
        })
    },

    async getVozovnaPankracMenu($: CheerioAPI, menus: Menu[]) {
        //const menuUrl = $('.menu-downloads a').first().attr('href');

        // TODO: Figure out how to get link from spa, for now, static link url
        const menuUrl = 'https://cdn.website.dish.co/media/ef/17/8875980/Aktualni-nabidka.pdf';

        // Fetch the pdf from link
        const pdfResponse = await fetch(menuUrl);
        const pdfBuffer = new Uint8Array(await pdfResponse.arrayBuffer());
        const pdfFile = await parsePdf(pdfBuffer);

        const contentsByDay: Record<string, string[]> = {
            'Pondělí': [],
            'Úterý': [],
            'Středa': [],
            'Čtvrtek': [],
            'Pátek': []
        }
        const days = Object.keys(contentsByDay);

        // Select string contents of menus per each day
        let dayIndex: number | null = null;
        pdfFile.pages[0].contents.forEach((content) => {
            const parsedContent = content.replace(',-', '');

            // Can start getting string contents for specific day
            if (days.includes(parsedContent)) {
                dayIndex = days.indexOf(parsedContent);
                return;
            }

            // Didn't start getting string contents for specific day
            if (dayIndex === null) {
                return;
            }

            // Push string content for specific day
            contentsByDay[days[dayIndex]].push(parsedContent);
        });

        // Parse menu items from string contents of each day
        const weekStartDate = DateTime.now().startOf('week');
        days.forEach((day, index) => {
            menus[index] = {date: weekStartDate.plus({days: index}), items: []};

            // Parse menu items from string contents for day by index
            const currentItem = {name: '', price: -1};
            contentsByDay[day].forEach(content => {
                const price = parseInt(content);
                // String is number, so its price - can finalize current item
                if (!isNaN(price)) {
                    currentItem.price = price;
                    // Got price for current item, push its values and reset current item
                    menus[index].items.push({...currentItem});

                    // Reset current item
                    currentItem.name = '';
                    currentItem.price = -1;
                    // String is not number, so its name (or part of name) - add to current item's name
                } else {
                    currentItem.name += content;
                }
            });
        })
    }


}
