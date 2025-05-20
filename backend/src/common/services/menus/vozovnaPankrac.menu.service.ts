import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {useCheerio} from "../../composables/cheerio.comp";
import {DateTime} from "luxon";
import {parsePdf} from "../../helpers/pdfParser.helper";

export class VozovnaPankracMenuService implements MenuService {
    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.VOZOVNA_PANKRAC);

        //const menuUrl = $('.menu-downloads a').first().attr('href');

        // TODO: Figure out how to get link from spa, for now, static link url
        const menuUrl = 'https://cdn.website.dish.co/media/e6/96/9097088/Aktualni-nabidka.pdf';

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

        const menus: Menu[] = [];

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
        });

        return menus;
    }
}
