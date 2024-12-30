import {describe, expect, it} from "vitest";
import {env} from "cloudflare:test";
import {MenuService} from "../../../src/common/services/menu.service";
import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";


describe("getMenu", () => {
    it("should get menu", async () => {
        //
        // Arrange
        //
        const restaurantId = restaurantEnum.KLIKA;

        //
        // Act
        //

        const result = await MenuService.getMenu(restaurantId, env);


        //
        // Assert
        //

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    });
});
