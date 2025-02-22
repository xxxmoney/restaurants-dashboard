import {describe, expect, it} from "vitest";
import {env} from "cloudflare:test";
import {MenuService} from "../../../src/common/services/menu.service";
import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";


describe("getMenu", () => {
    it("should get menu cinky linky", async () => {
        const restaurantId = restaurantEnum.CINKY_LINKY;

        const result = await MenuService.getMenu(restaurantId, env);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    });

    it("should get menu klika", async () => {
        const restaurantId = restaurantEnum.KLIKA;

        const result = await MenuService.getMenu(restaurantId, env);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    });

    it("should get menu red hook", async () => {
        const restaurantId = restaurantEnum.BAR_RED_HOOK;

        const result = await MenuService.getMenu(restaurantId, env);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    });

    it("should get menu palatino", async () => {
        const restaurantId = restaurantEnum.PALATINO;

        const result = await MenuService.getMenu(restaurantId, env);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    });


});
