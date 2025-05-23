import {beforeAll, describe, expect, it} from "vitest";
import {env} from "cloudflare:test";
import {Menus} from "../../../src/common/dto/menu";
import {DateTime} from "luxon";
import {MenuCategorizer} from "../../../src/common/services/menuCategorizer.service";
import * as matchers from 'expect-matchers';
import {LONG_RUNNING_TEST_TIMEOUT} from "../../constants";

describe("categorizeMenus", () => {
    beforeAll(() => {
        expect.extend(matchers);
    });

    it("should categorize menus to main typical categories", async () => {
        const expected = ['Polévky', 'Hlavní jídla', 'Saláty', 'Dezerty'];

        const menus = {
            menus: [
                {
                    date: DateTime.now(),
                    items: [
                        {
                            name: "Sladké knedlíky s mákem",
                            price: 120
                        },
                        {
                            name: "Pečené kuře na paprice s knedlíkem a okurkou",
                            price: 140
                        },
                        {
                            name: "Kuřecí steak s hranolkami a zeleninou",
                            price: 150
                        },
                        {
                            name: "Wok s kuřecím masem a zeleninou",
                            price: 135
                        },
                        {
                            name: "Special Ceaser salát - šéfkuchařův výběr",
                            price: 160
                        },
                        {
                            name: "Kuřecí vývar s nudlemi",
                            price: 40
                        },
                        {
                            name: "Dušená zelenina s rýží na kokosovém mléce s koriandrem",
                            price: 110
                        },
                    ]
                }
            ]
        } as Menus;

        const result = await MenuCategorizer.categorizeMenus(menus, env);
        const categories = result.categorizedMenus[0].categorizedItems.map(item => item.category);

        console.log(JSON.stringify(result, null, 2));

        expect(result).not.null;
        expect(categories).toIncludeSameMembers(expected);
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should NOT categorize when menus empty", async () => {
        const menus = {
            menus: []
        } as Menus;

        const result = await MenuCategorizer.categorizeMenus(menus, env);
        console.log(JSON.stringify(result, null, 2));

        expect(result).not.null;
        expect(result.categorizedMenus).to.be.empty
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
